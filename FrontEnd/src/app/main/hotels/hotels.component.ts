import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HotelService } from '../../admin/hotel/hotel.service';
import { PaginationService } from '../../shared/pagination/pagination.service';
import { ReviewService } from '../../shared/review.service';
import { RatingService } from '../../shared/rating.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'], // Fix typo from "styleUrl" to "styleUrls"
})
export class HotelsComponent implements OnInit {
  hotels: any[] = [];
  quantity: number = this.hotels.length;
  selectedHotel: any = null;
  perPage = 2;
  carouselOptions: OwlOptions = {
    autoplay: true,
    nav: false,
    items: 1,
    dots: false,
  };

  reviewText: string = ''; // User input for review
  ratingScore: number = 0;  // User input for rating

  constructor(
    private hotelService: HotelService,
    private paginationService: PaginationService,
    private reviewService: ReviewService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(
      (data) => {
        this.hotels = data;
      },
      (error) => {
        console.error('Error fetching hotel data:', error);
      }
    );
  }

  getSlice(): any[] {
    const startIndex = (this.paginationService.actualPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    return this.hotels.slice(startIndex, endIndex);
  }

  setSelectedHotel(hotel: any): void {
    this.selectedHotel = hotel;
  }

  // Method to submit a review
  submitReview(hotelId: number): void {
    if (this.reviewText && hotelId) {
      const reviewData = {
        userId: 1, // Assuming user ID is 1 for this example, replace with actual user ID
        hotelId: hotelId,
        comment: this.reviewText,
        title: 'Review Title', // You can extend this to include a title
        createdAt: new Date().toISOString()
      };

      this.reviewService.createReview(reviewData).subscribe(
        (response) => {
          console.log('Review submitted successfully:', response);
          this.selectedHotel.reviews.push(response); // Update the reviews list
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    }
  }

  submitRating(productId: number): void {
    if (this.ratingScore && productId) {
      // Create the rating data object according to the expected backend structure
      const ratingData = {
        productId: productId,  // The ID of the product/hotel being rated
        userId: 9,              // Assuming user ID is 1 for this example, replace with actual user ID
        score: this.ratingScore // Rating score (1-5)
      };
  
      // Debugging: Log the rating data to check the values being sent to the backend
      console.log('Rating data being sent to the backend:', ratingData);
  
      // Call the backend service to create or update the rating
      this.ratingService.createOrUpdateRating(ratingData).subscribe(
        (response) => {
          console.log('Rating submitted successfully:', response);
          this.selectedHotel.ratings.push(response); // Update the ratings list with the new rating
        },
        (error) => {
          console.error('Error submitting rating:', error);
        }
      );
    }
  }
  
  
}
