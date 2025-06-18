import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  //imports: [],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent implements OnInit {
  restaurants: any[] = [];
  restaurantForm: FormGroup;
  isEditMode = false;
  selectedRestaurantId: number | null = null;
  newPictureUrl = '';

  constructor(private restaurantService: RestaurantService, private fb: FormBuilder) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      cuisine: ['', Validators.required],
      pictureList: ['', Validators.required],
      menuList: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => this.restaurants = data,
      (error) => console.error('Error fetching restaurants:', error)
    );
  }

  addPicture(): void {
    const url = this.newPictureUrl.trim();
    if (!url) {
      alert('Please enter a valid picture URL.');
      return;
    }
  
    let pictures = this.restaurantForm.get('pictureList')?.value;
  
    // Normalize to array
    if (typeof pictures === 'string') {
      pictures = pictures ? pictures.split(',').map((u: string) => u.trim()) : [];
    } else if (!Array.isArray(pictures)) {
      pictures = [];
    }
  
    pictures.push(url);
  
    // Set back the joined string, or set as array if your backend expects array
    this.restaurantForm.get('pictureList')?.setValue(pictures.join(','));
    this.newPictureUrl = '';
  }
  

  removePicture(index: number): void {
    const list = this.restaurantForm.get('pictureList')?.value.split(',').map((url: string) => url.trim());
    list.splice(index, 1);
    this.restaurantForm.patchValue({ pictureList: list.join(', ') });
  }

  openModal(restaurant: any = null): void {
    this.isEditMode = !!restaurant;
    this.selectedRestaurantId = restaurant?.id || null;

    this.restaurantForm.patchValue({
      name: restaurant?.name || '',
      location: restaurant?.location || '',
      description: restaurant?.description || '',
      phoneNumber: restaurant?.phoneNumber || '',
      cuisine: restaurant?.cuisine || '',
      pictureList: restaurant?.pictureList?.join(', ') || '',
      menuList: restaurant?.menuList?.join(', ') || ''
    });

    const modal = document.getElementById('restaurantModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  saveRestaurant(): void {
    if (this.restaurantForm.invalid) {
      const invalidFields = Object.keys(this.restaurantForm.controls).filter(key => this.restaurantForm.get(key)?.invalid);
      alert('Please fill in all required fields: ' + invalidFields.join(', '));
      return;
    }

    const formValue = { ...this.restaurantForm.value };
    formValue.pictureList = formValue.pictureList.split(',').map((url: string) => url.trim());
    formValue.menuList = formValue.menuList.split(',').map((item: string) => item.trim());

    const request = this.isEditMode && this.selectedRestaurantId
      ? this.restaurantService.updateRestaurant(this.selectedRestaurantId, formValue)
      : this.restaurantService.addRestaurant(formValue);

    request.subscribe(
      () => {
        alert(this.isEditMode ? 'Restaurant updated!' : 'Restaurant added!');
        this.fetchRestaurants();
        this.closeModal();
      },
      (error) => {
        console.error('Error saving restaurant:', error);
        alert('Failed to save restaurant.');
      }
    );
  }

  deleteRestaurant(id: number): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe(
        () => {
          alert('Restaurant deleted successfully!');
          this.fetchRestaurants();
        },
        (error) => {
          console.error('Error deleting restaurant:', error);
          alert('Failed to delete restaurant.');
        }
      );
    }
  }

  closeModal(): void {
    const modal = document.getElementById('restaurantModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
    this.restaurantForm.reset();
    this.isEditMode = false;
    this.selectedRestaurantId = null;
  }

  menuItems: { name: string; price: number }[] = [];

addMenuItem() {
  this.menuItems.push({ name: '', price: 0 });
}

removeMenuItem(index: number) {
  this.menuItems.splice(index, 1);
}
}