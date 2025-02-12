import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService } from './activity.service';
import { NgxFileDropModule } from 'ngx-file-drop'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; // Add this import

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,          // Import CommonModule for ngIf and ngFor
    ReactiveFormsModule,    // Import ReactiveFormsModule for the form handling
    HttpClientModule,       // Import HttpClientModule for HTTP requests
    NgxFileDropModule,
    FormsModule      // Import the NgxFileDropModule
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activities: any[] = [];
  activityForm: FormGroup;
  isEditMode = false;
  selectedActivityId: number | null = null;

  constructor(private activityService: ActivityService, private fb: FormBuilder) {
    // Initialize the form with validation
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],  // Added type field
      pictureList: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchActivities();
  }

  newPictureUrl: string = '';  // Define the variable here

  addPicture(): void {
    if (!this.newPictureUrl || this.newPictureUrl.trim() === '') {
      alert('Please enter a valid picture URL.');
      return;
    }
  
    // Get the current pictureList value from the form
    let currentPictures = this.activityForm.get('pictureList')?.value;
  
    // Convert to an array if it's a string
    if (typeof currentPictures === 'string') {
      currentPictures = currentPictures ? currentPictures.split(',').map((url) => url.trim()) : [];
    }
  
    // Add the new picture URL to the array
    currentPictures.push(this.newPictureUrl.trim());
  
    // Update the form control with the new array as a comma-separated string
    this.activityForm.get('pictureList')?.setValue(currentPictures.join(','));
  
    // Clear the input field
    this.newPictureUrl = '';
  }

  removePicture(index: number): void {
    const pictureList = this.activityForm.get('pictureList')?.value.split(',').map((url: string) => url.trim());
    pictureList?.splice(index, 1);
    this.activityForm.patchValue({
      pictureList: pictureList?.join(', ')
    });
  }

  fetchActivities(): void {
    this.activityService.getActivities().subscribe(
      (data: any) => {
        this.activities = data;
      },
      (error) => {
        console.error('Error fetching activities:', error);
      }
    );
  }

  openModal(activity: any = null): void {
    this.isEditMode = !!activity;
    this.selectedActivityId = activity?.id || null;
    this.activityForm.patchValue({
      name: activity?.name || '',
      location: activity?.location || '',
      description: activity?.description || '',
      type: activity?.type || '', // Added type field
      pictureList: activity?.pictureList ? activity.pictureList.join(', ') : ''
    });
    const modal = document.getElementById('activityModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  saveActivity(): void {
    if (this.activityForm.invalid) {
      const invalidFields: string[] = [];
      Object.keys(this.activityForm.controls).forEach((field) => {
        const control = this.activityForm.get(field);
        if (control && control.invalid) {
          invalidFields.push(field);
        }
      });
      alert('Please fill in all required fields. Missing: ' + invalidFields.join(', '));
      return;
    }

    const activityData = { ...this.activityForm.value };
    activityData.pictureList = activityData.pictureList
      ? activityData.pictureList.split(',').map((url: string) => url.trim())
      : [];
  
    if (this.isEditMode && this.selectedActivityId) {
      this.activityService.updateActivity(this.selectedActivityId, activityData).subscribe(
        () => {
          alert('Activity updated successfully!');
          this.fetchActivities();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating activity:', error);
          alert('Failed to update activity.');
        }
      );
    } else {
      this.activityService.addActivity(activityData).subscribe(
        () => {
          alert('Activity added successfully!');
          this.fetchActivities();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding activity:', error);
          alert('Failed to add activity.');
        }
      );
    }
  }

  deleteActivity(id: number): void {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activityService.deleteActivity(id).subscribe(
        () => {
          alert('Activity deleted successfully!');
          this.fetchActivities();
        },
        (error) => {
          console.error('Error deleting activity:', error);
          alert('Failed to delete activity.');
        }
      );
    }
  }

  closeModal(): void {
    const modal = document.getElementById('activityModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
    this.activityForm.reset();
    this.isEditMode = false;
    this.selectedActivityId = null;
  }
}
