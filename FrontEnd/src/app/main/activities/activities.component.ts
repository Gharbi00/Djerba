import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivityService } from '../../admin/activity/activity.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  activities: any[] = [];
  carouselOptions: OwlOptions = {
    autoplay: true,
    nav: false,
    items: 1,
    dots: false,
  };

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(
      (data) => {
        this.activities = data;
      },
      (error) => {
        console.error('Error fetching activity data:', error);
      }
    );
  }
}
