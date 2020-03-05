import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductRequest } from '../product';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.sass']
})
export class ProductFiltersComponent implements OnInit, FilterComponent {
  @Output() filter = new EventEmitter<ProductRequest>();
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

  buildRequest(): ProductRequest {
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
