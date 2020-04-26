import { Subject } from 'rxjs';
import { PaginationControl } from 'src/app/shared/paginator';
import FilterRequest from 'src/app/shared/request';
import { Sort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';

export class FilterHandler {
  private request: FilterRequest;
  private sort: Sort;
  private searchQuery;
  private paginator: PaginationControl = {
    currentPage: 1,
    perPage: 20
  };
  resetSubject = new Subject();

  constructor() {}

  setRequest(request: FilterRequest) {
    this.request = request;
  }

  /**
   * before getting the request we should set the default filters
   * sort by and paginator control
   */
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

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  addDefaultFilters() {
    this.setRequest({
      ...this.request,
      perPage: this.paginator.perPage,
      currentPage: this.paginator.currentPage,
      sortBy: this.sort ? this.sort.active : '',
      sortDirection: this.sort ? this.sort.direction : '',
      searchQuery: this.searchQuery ? this.searchQuery : ''
    });
  }
}

export interface FilterComponent {
  filterHandler: FilterHandler;
  filterForm: FormGroup;
  isFormEmpty: boolean;
  submitFilters(): void;
  resetFilters(): void;
  buildRequest(): FilterRequest;
  buildForm(): void;
}
