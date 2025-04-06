import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PaginationComponent,
    AuthComponent,
    SearchComponent,
    SideBarComponent,
    
  ],
  imports: [CommonModule, RouterModule, RouterOutlet, ReactiveFormsModule,NgxSliderModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PaginationComponent,
    AuthComponent,
    SideBarComponent,
  ],
  providers: [AuthService],
})
export class SharedModule {}
