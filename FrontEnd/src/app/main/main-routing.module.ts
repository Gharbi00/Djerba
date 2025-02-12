import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SitesComponent } from './sites/sites.component';
import { HotelSingleComponent } from './hotels/hotel-single/hotel-single.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'about', component: AboutComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelSingleComponent },

  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'sites', component: SitesComponent },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
