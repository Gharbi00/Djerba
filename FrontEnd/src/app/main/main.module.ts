import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SitesComponent } from './sites/sites.component';
import { MainRoutingModule } from './main-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ActivityService } from '../admin/activity/activity.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BlogModule } from './blog/blog.module';
import { HotelSingleComponent } from './hotels/hotel-single/hotel-single.component';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './error404/error404.component';
import { BookingModalComponent } from './hotels/booking-modal/booking-modal.component';
import { BookingService } from './hotels/booking-modal/booking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingService } from '../shared/services/rating.service';
import { ReviewService } from '../shared/services/review.service';
import { HotelService } from '../shared/services/hotel.service';

@NgModule({
  declarations: [
    BookingModalComponent,
    AboutComponent,
    Error404Component,
    HotelSingleComponent,
    ActivitiesComponent,
    ActivitiesComponent,
    ContactComponent,
    HomeComponent,
    HotelsComponent,
    RestaurantsComponent,
    SitesComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CarouselModule,
    BlogModule,
    CountdownModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    HotelService,
    ActivityService,
    BookingService,
    provideHttpClient(withFetch()),
    RatingService,
    ReviewService,
  ],
})
export class MainModule {}
