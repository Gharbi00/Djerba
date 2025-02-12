import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {
  @Input() hotel: any;
  @Output() bookingConfirmed = new EventEmitter<void>();
  userId: number | null = null;
  bookingForm: FormGroup;

  totalPrice: number = 0;
  selectedOfferPrice: number = 0;
  availablePlaces: number[] = [];  // Added for the dropdown values

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({
      service: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      offerPrice: ['', Validators.required],
      adultPlaces: [0, [Validators.min(0)]], // Changed this from totalBookedPlaces
      babies: [0, [Validators.min(0)]],
      children: [0, [Validators.min(0)]],
      teens: [0, [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.hotel?.offersPrices?.length > 0) {
      this.bookingForm.get('offerPrice')?.setValue(this.hotel.offersPrices[0]);
      this.selectedOfferPrice = this.hotel.offersPrices[0];
    }

    this.userId = this.authService.getUserId();
    if (!this.userId && this.isBrowser()) {
      const storedUserId = localStorage.getItem('userId');
      this.userId = storedUserId ? parseInt(storedUserId, 10) : null;
    }

    // Initialize available places for dropdown selection
    this.availablePlaces = Array.from({ length: this.hotel?.availablePlaces || 0 }, (_, i) => i + 1);
  }

  calculateAdults(): void {
    const adultPlaces = this.bookingForm.get('adultPlaces')?.value || 0;
    const babies = this.bookingForm.get('babies')?.value || 0;
    const children = this.bookingForm.get('children')?.value || 0;
    const teens = this.bookingForm.get('teens')?.value || 0;
  
    // Calculate number of adults
    const adults = adultPlaces - (babies + children + teens);
  
    // Ensure no negative values
    this.bookingForm.get('adults')?.setValue(Math.max(0, adults));
  
    // Recalculate the total price after determining the number of adults
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);
    const numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
  
    if (numberOfNights <= 0) {
      this.totalPrice = 0;
      return;
    }
  
    this.selectedOfferPrice = this.bookingForm.get('offerPrice')?.value || 0;
  
    // Get the number of adults and discounts
    const adults = this.bookingForm.get('adultPlaces')?.value || 0;
    const babies = this.bookingForm.get('babies')?.value || 0;
    const children = this.bookingForm.get('children')?.value || 0;
    const teens = this.bookingForm.get('teens')?.value || 0;

    // Discount rates
    const babiesDiscount = this.hotel?.babiesDiscount || 0;
    const childrenDiscount = this.hotel?.childrenDiscount || 0;
    const teenDiscount = this.hotel?.teenDiscount || 0;
  
    // Calculate totals for each group
    const babiesTotal = babies * babiesDiscount;
    const childrenTotal = children * childrenDiscount;
    const teensTotal = teens * teenDiscount;
    const adultsTotal = adults; // Adjusted for real adult count
  
    console.log(adultsTotal, "adult price");
    // Sum up the total price
    const totalPersonsPrice = babiesTotal + childrenTotal + teensTotal + adultsTotal;
    this.totalPrice = numberOfNights * this.selectedOfferPrice * totalPersonsPrice;
  }

  onSubmit(): void {
    console.log('Submit button clicked');
  
    // Log form values for debugging
    console.log('Form Values:', this.bookingForm.value);
  
    // Extract form values safely
    const checkInDate = this.bookingForm.get('checkInDate')?.value || '';
    const checkOutDate = this.bookingForm.get('checkOutDate')?.value || '';
    const adultPlaces = this.bookingForm.get('adultPlaces')?.value ?? 0;
    const offerPrice = this.bookingForm.get('offerPrice')?.value ?? 0;
    const userId = this.userId || null;
    const hotelId = this.hotel?.id || null;
  
    // Check if required fields are missing
    const missingFields = [];
    if (!checkInDate) missingFields.push('Check-in Date');
    if (!checkOutDate) missingFields.push('Check-out Date');
    if (adultPlaces <= 0) missingFields.push('Adult Places');
    if (offerPrice <= 0) missingFields.push('Offer Price');
    if (!userId) missingFields.push('User ID');
    if (!hotelId) missingFields.push('Hotel ID');
  
    // Debugging: Show missing fields
    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
  
    // Construct booking data with valid values
    const bookingData = {
      hotelId: Number(hotelId), // Ensure it's a number
      userId: Number(userId),   // Ensure it's a number
      checkInDate,
      checkOutDate,
      numberOfAdults: adultPlaces,
      numberOfTeens: this.bookingForm.get('teens')?.value || 0,
      numberOfChildren: this.bookingForm.get('children')?.value || 0,
      numberOfBabies: this.bookingForm.get('babies')?.value || 0,
      bookingPrice: this.totalPrice || 0
    };
  
    console.log('Final Booking Data:', bookingData); // Debugging before submission
  
    // Make API request
    this.bookingService.createBooking(bookingData).subscribe(
      (response) => {
        console.log('Booking Successful:', response);
        alert(`Booking Successful for Hotel: ${this.hotel.name}`);
        this.bookingConfirmed.emit();
      },
      (error) => {
        console.error('Booking Failed:', error);
        alert(`Booking failed. Please try again.${error}`);
      }
    );
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}



