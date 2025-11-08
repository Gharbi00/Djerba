import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
import { PaginationService } from './pagination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() adClass = '';
  @Input() perPage = 3;
  @Input() total: number = 0;
  @Input() length: number = 0;
  @Input() baseRoute: string = '/blog';

  limit = 1;
  params: any;
  lastPage = 1;
  current = '/';
  startIndex = 1;
  actualPage = 1;
  pagesToBeShown: number[] = [];

  constructor(public router: Router, public activeRoute: ActivatedRoute, private paginationService: PaginationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.current = event.url;
      } else if (event instanceof NavigationEnd) {
        this.current = event.url;
      }
    });
    activeRoute.queryParams.subscribe((params) => {
      this.params = params;
      this.refresh();
    });
  }

  ngOnChanges() {
    this.refresh();
  }

  ngOnInit(): void { }

  refresh() {
    this.actualPage = this.params['page'] ? parseInt(this.params['page'], 10) : 1;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.startIndex = !(this.actualPage % this.perPage)
      ? this.actualPage
      : this.perPage * Math.floor(this.actualPage / this.perPage);

    this.pagesToBeShown = [];
    const pageCount = Math.ceil(this.total / this.perPage);

    // Handle case for more than 3 pages
    for (let i = -1; i < 2 && pageCount >= 3; i++) {
      if (1 < this.actualPage && this.actualPage < pageCount) {
        this.pagesToBeShown.push(this.actualPage + i);
      } else if (1 === this.actualPage) {
        this.pagesToBeShown.push(this.actualPage + i + 1);
      } else if (this.actualPage === pageCount) {
        this.pagesToBeShown.push(this.actualPage + i - 1);
      }
    }

    // Handle case for less than 3 pages
    for (let i = 0; i < pageCount && pageCount < 3; i++) {
      this.pagesToBeShown.push(i + 1);
    }

    this.paginationService.actualPage = this.actualPage;

    let start = Math.max(1, this.actualPage - 1);
    let end = this.actualPage + 2;

    if (this.actualPage + 2 > pageCount) {
      end = pageCount;
    } else if (this.actualPage + 1 > pageCount) {
      end = pageCount;
    }

    this.pagesToBeShown = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }


}