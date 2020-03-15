import { Component, OnInit, Input } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  BannerRequest } from '../banner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-banner-filters',
  templateUrl: './banner-filters.component.html',
  styleUrls: ['./banner-filters.component.sass']
})
export class BannerFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<BannerRequest>;
  filterForm: FormGroup;

  constructor(private form: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  submitFilters(): void {
    this.filter.next(this.buildRequest());
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.submitFilters();
  }

  buildRequest(): BannerRequest {
    return {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      searchQuery: ['']
    });
  }

  get searchQuery() {
    return this.filterForm.get('searchQuery');
  }

  get isFormEmpty() {
    return (
      !this.searchQuery.value
    );
  }

}
