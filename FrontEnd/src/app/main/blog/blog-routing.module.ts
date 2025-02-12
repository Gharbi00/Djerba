import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


const blogRoutes: Routes = [
  { path: '', component: BlogListComponent }, // Default route
  { path: 'details', component: BlogDetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})

export class BlogRoutingModule { }
