import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  actualPage: number=0;
  blogs=[];
  constructor() { }
}