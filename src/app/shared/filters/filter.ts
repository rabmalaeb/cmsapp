import { Subject } from 'rxjs';
import { PaginationControl } from 'src/app/shared/paginator';
import Request from 'src/app/shared/request';
import { Sort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';

export class FilterHandler {
  private request: Request;
  private sort: Sort;
  private paginator: PaginationControl = {
    currentPage: 1,
    perPage: 20
  };
  resetSubject = new Subject();

  constructor() {}

  setRequest(request: Request) {
    this.request = request;
  }

  getRequest() {
    this.addDefaultFilters();
    return this.request;
  }

  setPaginator(currentPage: number, perPage: number) {
    this.paginator.currentPage = currentPage;
    this.paginator.perPage = perPage;
  }

  getPaginator() {
    return this.paginator;
  }

  setSort(sort: Sort) {
    this.sort = sort;
  }

  addDefaultFilters() {
    this.setRequest({
      ...this.request,
      perPage: this.paginator.perPage,
      currentPage: this.paginator.currentPage,
      sortBy: this.sort ? this.sort.active : '',
      sortDirection: this.sort ? this.sort.direction : '',
    });
  }

  setSearchQuery(query: string) {
    this.request.searchQuery = query;
  }
}

export interface FilterComponent {
  filterHandler: FilterHandler;
  filterForm: FormGroup;
  isFormEmpty: boolean;
  submitFilters(): void;
  resetFilters(): void;
  buildRequest(): Request;
  buildForm(): void;
}
