import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoading = true;
  videoUrl: SafeResourceUrl | null = null;
  showModal = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private sanitizer: DomSanitizer) {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }
  carouselOptions: OwlOptions = {
    loop: false,
    nav: true,
    dots: false,
    items: 1, // Ensure this matches your layout (1 for single slide per view)
    navText: [
      '<div><span class="fa fa-angle-left"></span></div>',
      '<div><span class="fa fa-angle-right"></span></div>',
    ],
  };

  slides = [
    {
      image: '/image/bg0.jpg', // Change to an image from Djerba Island
      date: 'March 15, 2025', // Update with a relevant date for the event
      title: 'Explore the Beauty <br />Of Djerba Island',
      seats: 'Limited Availability', // Adjust this to reflect the tourist activity
      speakers: 'Guided Tours Available', // Replace with information on available guides or tours
      location: 'Djerba, Tunisia', // Update location to Djerba
      link: 'book-tour.html', // Adjust link to point to booking or information page
    },
    {
      image: '/image/bg0.jpg', // Change to another relevant image of Djerba
      date: 'April 10, 2025',
      title: 'Discover the Magical <br />Sunsets of Djerba',
      seats: 'Join a Sunset Cruise', // Replace with an activity, like a sunset cruise
      speakers: 'Expert Tour Guides', // Mention guides if applicable
      location: 'Djerba, Tunisia',
      link: 'sunset-tour.html', // Link to book sunset tour
    },
    {
      image: '/image/bg0.jpg', // Update with another Djerba-related image
      date: 'May 20, 2025',
      title: 'Enjoy the Serenity <br />of Djerba Beaches',
      seats: 'Beach Loungers Available', // Reflect beach seating availability
      speakers: 'Relax by the Sea', // Focus on relaxation, beach activities
      location: 'Djerba, Tunisia',
      link: 'book-beach-day.html', // Link to book beach day or lounge chair
    },
    {
      image: '/image/bg0.jpg', // Add a more scenic image from Djerba Island
      date: 'June 5, 2025',
      title: 'Djerba Cultural <br />Festival 2025',
      seats: 'Festival Tickets Now Available', // Update to indicate availability of tickets
      speakers: 'Local Artisans & Performers', // Highlight local culture and performers
      location: 'Djerba, Tunisia',
      link: 'festival-info.html', // Link to festival details and booking
    },
  ];

  testimonialsCarousel = {
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  };

  testimonies = [
    {
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      image: '/images/person_1.jpg',
      name: 'Roger Scott',
      position: 'Marketing Manager',
    },
    {
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      image: '/images/person_2.jpg',
      name: 'Roger Scott',
      position: 'Marketing Manager',
    },
    {
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      image: '/images/person_3.jpg',
      name: 'Roger Scott',
      position: 'Marketing Manager',
    },
  ];

  destinations = [
    { name: 'Seguia', image: 'image/seguia.jpg', distance: '23 km' },
    { name: 'Sidi Jmour', image: 'image/sidi-jmour.jpg', distance: '12 km' },
    {
      name: 'Lella Hadhreya',
      image: 'image/lella-hadhreya.jpg',
      distance: '23 km',
    },
    { name: 'Yati Beach', image: 'image/yati-beach.jpg', distance: '22 km' },
    { name: 'Aghir', image: 'image/aghir.jpg', distance: '22 km' },
  ];

  destinationCarousel = {
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 8000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1400: { items: 4 },
    },
  };
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Only initialize AOS in the browser
    }
  }

  openVideo(videoLink: string): void {
    console.log('Video link received:', videoLink);

    const videoId = this.extractVideoId(videoLink);
    console.log('Extracted Video ID:', videoId);

    if (videoId) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
      );
      this.showModal = true;
      console.log('Modal should now be visible');
    } else {
      console.error('Invalid or missing video ID');
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.videoUrl = null;
  }

  private extractVideoId(url: string): string {
    console.log('Extracting Video ID from:', url);

    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|e\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);

    if (match && match[1]) {
      console.log('Valid YouTube ID found:', match[1]);
      return match[1];
    }

    console.error('Failed to extract Video ID from:', url);
    return '';
  }
}
