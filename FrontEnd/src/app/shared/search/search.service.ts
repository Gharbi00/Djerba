import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchToggler = new BehaviorSubject<boolean>(false);
  searchToggler$ = this.searchToggler.asObservable();

  toggleSearch() {
    this.searchToggler.next(!this.searchToggler.value);
  }

  setSearchState(value: boolean) {
    this.searchToggler.next(value);
  }
}
