import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this import
import { HotelService } from '../../shared/services/hotel.service';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule, // Import CommonModule for ngIf and ngFor
    ReactiveFormsModule, // Import ReactiveFormsModule for the form handling
    HttpClientModule, // Import HttpClientModule for HTTP requests
    NgxFileDropModule,
    FormsModule, // Import the NgxFileDropModule
  ],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  hotels: any[] = [];
  hotelForm: FormGroup;
  isEditMode = false;
  selectedHotelId: number | null = null;
  newOfferPrice: number | null = null;
  selectedFiles: { file: File; preview: string | null }[] = [];

  constructor(private hotelService: HotelService, private fb: FormBuilder) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      starsNumber: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      availablePlaces: [10, [Validators.required, Validators.min(0)]],
      offersPrices: [[20], Validators.required],
      location: ['City Center', Validators.required],
      description: ['A sample hotel', Validators.required],
      phoneNumber: [12345678, [Validators.pattern('^[0-9]+$')]],
      amenities: ['Pool, Gym'], // No Validators.required
      babiesDiscount: [0.2, [Validators.min(0), Validators.max(1)]],
      childrenDiscount: [0.3, [Validators.min(0), Validators.max(1)]],
      teenDiscount: [0.4, [Validators.min(0), Validators.max(1)]],
      photos: [null] // No validation here since we handle it separately
    });
  }

  addOfferPrice(): void {
    if (this.newOfferPrice === null || this.newOfferPrice <= 0) {
      alert('Please enter a valid offer price.');
      return;
    }

    const currentPrices = this.hotelForm.get('offersPrices')?.value || [];
    currentPrices.push(this.newOfferPrice);
    this.hotelForm.patchValue({ offersPrices: currentPrices });
    this.newOfferPrice = null;
  }

  removeOfferPrice(index: number): void {
    const currentPrices = this.hotelForm.get('offersPrices')?.value || [];
    currentPrices.splice(index, 1);
    this.hotelForm.patchValue({ offersPrices: currentPrices });
  }
  ngOnInit(): void {
    this.fetchHotels();
  }

  newPictureUrl: string = '';

  addPicture(): void {
    if (!this.newPictureUrl || this.newPictureUrl.trim() === '') {
      alert('Please enter a valid picture URL.');
      return;
    }

    let currentPictures = this.hotelForm.get('pictureList')?.value;

    if (typeof currentPictures === 'string') {
      currentPictures = currentPictures
        ? currentPictures.split(',').map((url) => url.trim())
        : [];
    }

    currentPictures.push(this.newPictureUrl.trim());
    this.hotelForm.get('pictureList')?.setValue(currentPictures.join(','));
    this.newPictureUrl = '';
  }

  removePicture(index: number): void {
    const pictureList = this.hotelForm
      .get('pictureList')
      ?.value.split(',')
      .map((url: string) => url.trim());
    pictureList?.splice(index, 1);
    this.hotelForm.patchValue({
      pictureList: pictureList?.join(', '),
    });
  }

  fetchHotels(): void {
    this.hotelService.getHotels().subscribe(
      (data: any) => {
        this.hotels = data;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  openModal(hotel: any = null): void {
    this.isEditMode = !!hotel;
    this.selectedHotelId = hotel?.id || null;
    this.hotelForm.patchValue({
      name: hotel?.name || '',
      location: hotel?.location || '',
      description: hotel?.description || '',
      phoneNumber: hotel?.phoneNumber || '',
      pictureList: hotel?.pictureList ? hotel.pictureList.join(', ') : '',
      amenities: hotel?.amenities || '',
    });
    const modal = document.getElementById('hotelModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }
  testAddHotel(): void {
    const hotelData = {
      name: 'Hotel Test',
      location: 'City Center',
      description: 'A sample hotel',
      phoneNumber: 12345678,
      amenities: 'Pool, Gym',   // Already string
      starsNumber: 3,
      availablePlaces: 10,
      offersPrices: [100.0, 120.0],  // Array of numbers
      babiesDiscount: 0.2,
      childrenDiscount: 0.3,
      teenDiscount: 0.4,
      photos: [
        {
          fileName: 'room.jpg',
          fileType: 'image/jpeg',
          base64Data: 'iVBORw0KGgoAAAANSUhEUgAAAAUA'  // dummy base64 string
        }
      ],
      ratings: [],
      reviews: []
    };



    this.hotelService.addHotel(hotelData).subscribe(
      () => {
        alert('Test hotel added successfully!');
        this.fetchHotels();
      },
      (error) => {
        console.error('Error adding test hotel:', error);
        alert('Failed to add test hotel.');
      }
    );
  }

  saveHotel(): void {
    if (this.selectedFiles.length === 0) {
      alert('Please upload at least one image for the hotel.');
      return;
    }

    this.convertFilesToBase64(this.selectedFiles.map(f => f.file)).then((photos) => {
      const formValue = this.hotelForm.value;

      // Structure data to match backend expectations
      const hotelData = {
        name: formValue.name,
        location: formValue.location,
        description: formValue.description,
        phoneNumber: Number(formValue.phoneNumber), // Ensure number
        amenities: formValue.amenities || 'Pool, Gym',
        starsNumber: formValue.starsNumber,
        availablePlaces: formValue.availablePlaces,
        offersPrices: formValue.offersPrices.map(Number), // Ensure array of numbers
        babiesDiscount: formValue.babiesDiscount,
        childrenDiscount: formValue.childrenDiscount,
        teenDiscount: formValue.teenDiscount,
        photos: photos.map(photo => ({
          fileName: photo.fileName,
          fileType: photo.fileType,
          base64Data: photo.base64Data
        })),
        ratings: [],
        reviews: []
      };

      console.log('Final hotel data:', hotelData);

      this.hotelService.addHotel(hotelData).subscribe({
        next: () => {
          alert('Hotel added successfully!');
          this.fetchHotels();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error details:', error);
          alert(`Failed to add hotel. ${error.error?.message || ''}`);
        }
      });
    });
  }

  convertFilesToBase64(files: File[]): Promise<any[]> {
    return Promise.all(files.map(file => this.processFile(file)));
  }

  private async processFile(file: File): Promise<any> {
    try {
      // Step 1: Compress if needed
      const processedFile = file.size > 1000000
        ? await this.compressImage(file)
        : file;

      // Step 2: Read as pure Base64 (without DataURL prefix)
      const base64Data = await this.readFileAsBase64(processedFile);

      return {
        fileName: file.name,
        fileType: file.type,
        base64Data: base64Data
      };
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Extract only the Base64 part (after comma)
        const result = reader.result as string;
        const base64String = result.split(',')[1];

        // Ensure no URI encoding remains
        const cleanBase64 = decodeURIComponent(base64String)
          .replace(/\s/g, '') // Remove any whitespace
          .replace(/[^A-Za-z0-9+/=]/g, ''); // Remove non-Base64 chars

        resolve(cleanBase64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


private compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) {
            // fallback: resolve original file if compress fails
            resolve(file);
            return;
          }
          resolve(new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
            type: 'image/webp',
            lastModified: Date.now()
          }));
        }, 'image/webp', 0.4);
      };
      img.onerror = () => {
        // fallback
        resolve(file);
      };
    };
  });
}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const validFiles = Array.from(input.files).filter(file => file.size <= 5000000); // 5MB limit
      if (validFiles.length !== input.files.length) {
        alert('Some files were too large (max 5MB) and were not selected.');
      }

      const newFiles = validFiles.map(file => {
        const preview = URL.createObjectURL(file);
        return { file, preview };
      });

      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      this.hotelForm.get('photos')?.setValue(this.selectedFiles.length > 0 ? 'files_selected' : null);
    }
    input.value = ''; // Reset input to allow selecting same files again
  }
  removeSelectedFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.hotelForm.get('photos')?.setValue(this.selectedFiles.length > 0 ? 'files_selected' : null);
  }

  deleteHotel(id: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(id).subscribe(
        () => {
          alert('Hotel deleted successfully!');
          this.fetchHotels();
        },
        (error) => {
          console.error('Error deleting hotel:', error);
          alert('Failed to delete hotel.');
        }
      );
    }
  }

  closeModal(): void {
    const modal = document.getElementById('hotelModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
    this.hotelForm.reset();
    this.isEditMode = false;
    this.selectedHotelId = null;
  }
}
