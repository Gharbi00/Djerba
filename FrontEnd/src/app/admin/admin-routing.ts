import { Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { UserComponent } from './user/user.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { SiteComponent } from './site/site.component';
import { TaxiComponent } from './taxi/taxi.component';
import { TouristGuideComponent } from './tourist-guide/tourist-guide.component';
import { ActivityComponent } from './activity/activity.component';
import { AdminRoleGuard } from './admin-guard';


export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'hotel', component: HotelComponent, canActivate: [AdminRoleGuard] },
      { path: 'restaurant', component: RestaurantComponent, canActivate: [AdminRoleGuard] },
      { path: 'site', component: SiteComponent, canActivate: [AdminRoleGuard] },
      { path: 'taxi', component: TaxiComponent, canActivate: [AdminRoleGuard] },
      { path: 'tourist-guide', component: TouristGuideComponent, canActivate: [AdminRoleGuard] },
      { path: 'activity', component: ActivityComponent, canActivate: [AdminRoleGuard] },
      { path: 'user', component: UserComponent, canActivate: [AdminRoleGuard] },
    ],
  },
];
