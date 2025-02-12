import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotelService } from './hotel.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this import

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

  constructor(private hotelService: HotelService, private fb: FormBuilder) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      pictureList: ['', Validators.required],
      amenities: [''],
      starsNumber: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      availablePlaces: [0, [Validators.required, Validators.min(0)]],
      offersPrices: [[], Validators.required],
    
      // Adding discount fields with validation between 0.0 and 1.0
      babiesDiscount: [0, [Validators.required, Validators.min(0), Validators.max(1)]],   // For age < 2
      childrenDiscount: [0, [Validators.required, Validators.min(0), Validators.max(1)]], // For age 2-12
      teenDiscount: [0, [Validators.required, Validators.min(0), Validators.max(1)]]     // For teens
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

  saveHotel(): void {
    if (this.hotelForm.invalid) {
      const invalidFields: string[] = [];
      Object.keys(this.hotelForm.controls).forEach((field) => {
        const control = this.hotelForm.get(field);
        if (control && control.invalid) {
          invalidFields.push(field);
        }
      });

      console.error('Invalid fields:', invalidFields);
      alert(
        'Please fill in all required fields. Missing: ' +
          invalidFields.join(', ')
      );
      return;
    }

    const hotelData = { ...this.hotelForm.value };
    console.debug('Raw hotel form data:', this.hotelForm.value);
    hotelData.pictureList = hotelData.pictureList
      ? hotelData.pictureList.split(',').map((url: string) => url.trim())
      : [];
    console.debug('Transformed hotel data:', hotelData);

    if (this.isEditMode && this.selectedHotelId) {
      // Update hotel logic
      console.debug(
        'Update mode: Updating hotel with ID:',
        this.selectedHotelId
      );
      this.hotelService.updateHotel(this.selectedHotelId, hotelData).subscribe(
        () => {
          console.log('Hotel updated successfully!');
          alert('Hotel updated successfully!');
          this.fetchHotels();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating hotel:', error);
          alert('Failed to update hotel.');
        }
      );
    } else {
      console.debug('Add mode: Adding new hotel.');
      this.hotelService.addHotel(hotelData).subscribe(
        () => {
          console.log('Hotel added successfully!');
          alert('Hotel added successfully!');
          this.fetchHotels();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding hotel:', error);
          alert('Failed to add hotel.');
        }
      );
    }
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
