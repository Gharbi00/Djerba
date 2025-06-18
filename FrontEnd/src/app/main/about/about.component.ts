import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  //imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
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
}
