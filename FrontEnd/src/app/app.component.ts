import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { HotelService } from './admin/hotel/hotel.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ActivityService } from './admin/activity/activity.service';
import { SharedModule } from './shared/shared.module';
import { PaginationService } from './shared/pagination/pagination.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  providers: [PaginationService], 
  standalone:true,
  imports: [RouterOutlet,AdminModule,CommonModule,NgxFileDropModule,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: object) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Only initialize AOS in the browser
    }

  }

  showButton: boolean = false;

  scrollThreshold: number = 400;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Get the current scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Update the variable based on the scroll position
    this.showButton = scrollPosition >= this.scrollThreshold;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  circumference: number = 307.919; // Circumference of the circle
  strokeOffset: number = this.circumference;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // Show the button if scrolled past 500px
    this.showButton = scrollTop > 500;

    // Calculate progress (scroll percentage)
    const progress = Math.min(scrollTop / docHeight, 1); // Max is 1 (100%)
    this.strokeOffset = this.circumference * (1 - progress);
  }
}
