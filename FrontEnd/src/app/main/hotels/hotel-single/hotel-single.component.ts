import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HotelService } from '../../../shared/services/hotel.service';
import { CommonModule } from '@angular/common';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'app-hotel-single',
  standalone: true,
  imports: [CommonModule,BookingModalComponent],
  templateUrl: './hotel-single.component.html',
  styleUrl: './hotel-single.component.scss'
})
export class HotelSingleComponent implements OnInit {
  hotel: any = null;
  hotelId: any;
  safeLocation!: SafeResourceUrl;
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id'); // Get the hotel ID from the route
    if (this.hotelId) {
      this.hotelService.getHotelById(this.hotelId).subscribe(
        (data) => {
          this.hotel = data;
        },
        (error) => {
          console.error('Error fetching hotel data:', error);
        }
      );
    }
    if (this.hotel?.location && typeof this.hotel.location === 'string') {
      this.safeLocation = this.sanitizer.bypassSecurityTrustResourceUrl(this.hotel.location);
    } else {
      console.error("Invalid location URL:", this.hotel?.location);
    }
  }

  getPhotoUrl(photo: { fileType: string; base64Data: string }): string {
    return `data:${photo.fileType};base64,${photo.base64Data}`;
  }

}
