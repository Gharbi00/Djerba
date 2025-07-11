import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private searchToggleService: SearchService){}
  toggleSearch() {
    this.searchToggleService.toggleSearch();
  }
}
