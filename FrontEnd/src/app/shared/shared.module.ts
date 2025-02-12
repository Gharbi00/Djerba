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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PaginationComponent,
    AuthComponent,
    SearchComponent
  ],
  imports: [CommonModule, RouterModule, RouterOutlet,ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PaginationComponent,
    AuthComponent
  ],
  providers:[AuthService]
})
export class SharedModule {}
