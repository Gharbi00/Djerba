import { Component, Inject, Input, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  standalone: true,
  imports: [CommonModule,NgxSliderModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SideBarComponent {

  @Input() pageType: string = 'hotels';

  categories: any[] = [];
  services: any[] = [];
  isBrowser;
  constructor(@Inject(PLATFORM_ID) private platformId: object) { this.isBrowser = isPlatformBrowser(this.platformId); }


  priceMin: number = 50;
  priceMax: number = 500;

  priceOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 10,
    translate: (value: number): string => {
      return `$${value}`;
    }
  };


  ngOnInit() {
    this.loadSidebarContent();
  }

  loadSidebarContent() {
    switch (this.pageType) {
      case 'hotels':
        this.categories = [
          { value: 'all', label: 'All Hotels' },
          { value: 'luxury', label: 'Luxury' },
          { value: 'boutique', label: 'Boutique' },
          { value: 'resort', label: 'Resort' },
          { value: 'budget', label: 'Budget' }
        ];
        this.services = [
          { value: 'wifi', label: 'Free Wi-Fi' },
          { value: 'pool', label: 'Swimming Pool' },
          { value: 'spa', label: 'Spa & Wellness' },
          { value: 'gym', label: 'Gym' },
          { value: 'pet-friendly', label: 'Pet-Friendly' },
          { value: 'beachfront', label: 'Beachfront' },
          { value: 'shuttle', label: 'Airport Shuttle' }
        ];
        break;

      case 'restaurants':
        this.categories = [
          { value: 'all', label: 'All Restaurants' },
          { value: 'fine-dining', label: 'Fine Dining' },
          { value: 'casual', label: 'Casual Dining' },
          { value: 'fast-food', label: 'Fast Food' },
          { value: 'cafe', label: 'Café' }
        ];
        this.services = [
          { value: 'wifi', label: 'Free Wi-Fi' },
          { value: 'parking', label: 'Parking Available' },
          { value: 'delivery', label: 'Home Delivery' },
          { value: 'outdoor', label: 'Outdoor Seating' },
          { value: 'live-music', label: 'Live Music' }
        ];
        break;

      case 'activities':
        this.categories = [
          { value: 'all', label: 'All Activities' },
          { value: 'adventure', label: 'Adventure' },
          { value: 'sports', label: 'Sports' },
          { value: 'cultural', label: 'Cultural' },
          { value: 'family', label: 'Family Friendly' }
        ];
        this.services = [
          { value: 'guide', label: 'Guided Tours' },
          { value: 'equipment', label: 'Equipment Rental' },
          { value: 'group', label: 'Group Discounts' },
          { value: 'children', label: 'Child-Friendly' }
        ];
        break;

      case 'sites':
        this.categories = [
          { value: 'all', label: 'All Sites' },
          { value: 'historical', label: 'Historical' },
          { value: 'natural', label: 'Natural' },
          { value: 'architectural', label: 'Architectural' },
          { value: 'religious', label: 'Religious' }
        ];
        this.services = [
          { value: 'guide', label: 'Guided Tours' },
          { value: 'audio-guide', label: 'Audio Guide' },
          { value: 'parking', label: 'Parking Available' },
          { value: 'restaurants', label: 'Nearby Restaurants' }
        ];
        break;
    }
  }
}
