import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Banner, BannerRequest } from '../banner';

@Component({
  selector: 'app-banner-filters',
  templateUrl: './banner-filters.component.html',
  styleUrls: ['./banner-filters.component.sass']
})
export class BannerFiltersComponent implements OnInit, FilterComponent {

  @Output() filter = new EventEmitter<BannerRequest>();
  filterForm: FormGroup;

  constructor(private form: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  submitFilters(): void {
    this.filter.emit(this.buildRequest());
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.submitFilters();
  }

  buildRequest(): BannerRequest {
    return {
      name: this.name.value ? this.name.value : '',
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      name: ['']
    });
  }

  get name() {
    return this.filterForm.get('name');
  }

  get isFormEmpty() {
    return (
      !this.name.value
    );
  }

}
