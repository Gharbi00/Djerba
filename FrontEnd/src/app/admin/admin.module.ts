import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRoutes } from './admin-routing';
import { RouterModule } from '@angular/router';
import { HotelService } from './hotel/hotel.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivityService } from './activity/activity.service';
import { AdminRoleGuard } from './admin-guard';



@NgModule({
  declarations: [],
  
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    HttpClientModule
  ],
  providers: [HotelService,ActivityService,AdminRoleGuard], 
})
export class AdminModule { }
