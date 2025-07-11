import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRoutes } from './admin-routing';
import { RouterModule } from '@angular/router';
import { HotelService } from '../shared/services/hotel.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivityService } from './activity/activity.service';
import { AdminRoleGuard } from './admin-guard';
import { RestaurantService } from './restaurant/restaurant.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AlertService } from '../shared/services/alert.service';

@NgModule({
  declarations: [RestaurantComponent],

  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxFileDropModule,
    FormsModule,
  ],
  providers: [HotelService, ActivityService, RestaurantService, AdminRoleGuard],
})
export class AdminModule {}
