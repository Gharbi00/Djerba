import { Component, HostListener, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth.component';
import { SearchComponent } from '../../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,AuthComponent,SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  scrollDetector = false;
  authToken: string | null = null;
  userId: number | null = null;
  megaMenuCollapsed: boolean = false;
  isDropdownOpen: boolean = false;
  searchToggler: boolean = false;

  constructor(private searchToggleService: SearchService, private alertService: AlertService) { }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.scrollDetector = scrollTop > 400;
  }

  toggleCollapseMegaMenu() {
    this.megaMenuCollapsed = !this.megaMenuCollapsed;
  }
  toggleSearch() {
    this.searchToggleService.toggleSearch();
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('button is clickd ', this.isDropdownOpen);
  }

  ngOnInit(): void {
    this.checkAuthToken();
    this.searchToggleService.searchToggler$.subscribe(value => {
      this.searchToggler = value;
    });
  }

  checkAuthToken(): void {
    if (this.isBrowser()) {
      this.authToken = localStorage.getItem('authToken');
    }
  }

  openLoginModal(): void {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('authValue');
      localStorage.removeItem('posId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      this.authToken = null;
      this.userId = null;

      this.alertService.showAlert('Logged out', 'You have been logged out successfully.', 'success')
        .then(() => {
          window.location.reload();
        });
    }


  }


  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
