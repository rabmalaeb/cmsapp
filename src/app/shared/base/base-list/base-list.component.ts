import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilterHandler } from '../../filters/filter';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss'],
})
export class BaseListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterHandler = new FilterHandler();
  fetchListAction: () => void;

  constructor() {}

  ngOnInit(): void {}

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.fetchListAction();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.fetchListAction();
  }
}
