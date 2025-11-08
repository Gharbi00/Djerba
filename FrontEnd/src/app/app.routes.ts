import { Routes } from '@angular/router';
import { Error404Component } from './main/error404/error404.component';
import { AdminRoleGuard } from './admin/admin-guard';
import { SitesComponent } from './main/sites/sites.component';
import { RestaurantsComponent } from './main/restaurants/restaurants.component';
import { HotelSingleComponent } from './main/hotels/hotel-single/hotel-single.component';
import { HotelsComponent } from './main/hotels/hotels.component';
import { ContactComponent } from './main/contact/contact.component';
import { HomeComponent } from './main/home/home.component';
import { ActivitiesComponent } from './main/activities/activities.component';
import { AboutComponent } from './main/about/about.component';
import { BlogListComponent } from './main/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './main/blog/blog-detail/blog-detail.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { RestaurantComponent } from './admin/restaurant/restaurant.component';
import { SiteComponent } from './admin/site/site.component';
import { TaxiComponent } from './admin/taxi/taxi.component';
import { TouristGuideComponent } from './admin/tourist-guide/tourist-guide.component';
import { ActivityComponent } from './admin/activity/activity.component';
import { UserComponent } from './admin/user/user.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'hotels', component: HotelsComponent },
      { path: 'hotels/:id', component: HotelSingleComponent },

      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'sites', component: SitesComponent },
      { path: 'blog', component: BlogListComponent },
      { path: 'blog/details', component: BlogDetailComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminRoleGuard],

    component: AdminLayoutComponent,
    children: [
      { path: 'hotel', component: HotelComponent },
      { path: 'restaurant', component: RestaurantComponent },
      { path: 'site', component: SiteComponent },
      { path: 'taxi', component: TaxiComponent },
      { path: 'tourist-guide', component: TouristGuideComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'user', component: UserComponent },
    ],
  },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: 'error404' },
];
