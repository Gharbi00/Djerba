import { Component, HostListener, OnInit } from '@angular/core';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-header',
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

  constructor(private searchToggleService: SearchService){}
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
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.authToken = null;
      this.userId = null;
      alert('You have been logged out successfully.');
    }
    window.location.reload();
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
