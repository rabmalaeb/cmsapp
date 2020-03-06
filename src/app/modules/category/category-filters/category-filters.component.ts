import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryRequest } from '../category';

@Component({
  selector: 'app-category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.sass']
})
export class CategoryFiltersComponent implements OnInit, FilterComponent {

  @Output() filter = new EventEmitter<CategoryRequest>();
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

  buildRequest(): CategoryRequest {
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
