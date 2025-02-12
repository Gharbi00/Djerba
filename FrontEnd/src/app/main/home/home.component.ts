import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  //imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {
  carouselOptions :OwlOptions= {
    loop: false,
    nav: true,
    dots:false,
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
  
  


}
