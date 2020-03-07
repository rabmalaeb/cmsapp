import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductRequest } from '../product';
import { Options, LabelType } from 'ng5-slider';
import { NumberRange } from 'src/app/shared/models/general';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.sass']
})
export class ProductFiltersComponent
  implements OnInit, OnChanges, FilterComponent {
  @Output() filter = new EventEmitter<ProductRequest>();
  @Input() retailPriceRange: NumberRange;
  @Input() originalPriceRange: NumberRange;
  filterForm: FormGroup;
  retailPriceSliderOptions: Options;
  originalPriceSliderOptions: Options;

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.setSliderOptions();
    console.log('originalPr', this.originalPriceRange);
    console.log('retailPriceRange', this.retailPriceRange);
  }

  ngOnChanges() {
    this.setSliderOptions();
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
      minimumRetailPrice: this.retailPriceRange.minimum,
      maximumRetailPrice: this.retailPriceRange.maximum,
      minimumOriginalPrice: this.originalPriceRange.minimum,
      maximumOriginalPrice: this.originalPriceRange.maximum,
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      name: ['']
    });
  }

  setSliderOptions() {
    this.originalPriceSliderOptions = {
      floor: this.originalPriceRange.minimum,
      ceil: this.originalPriceRange.maximum,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
    this.retailPriceSliderOptions = {
      floor: this.retailPriceRange.minimum,
      ceil: this.retailPriceRange.maximum,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
  }

  get name() {
    return this.filterForm.get('name');
  }

  get isFormEmpty() {
    return !this.name.value;
  }
}
