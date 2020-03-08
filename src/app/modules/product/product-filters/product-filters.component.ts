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
import { isRangeValid } from 'src/app/shared/utils/general';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.sass']
})
export class ProductFiltersComponent
  implements OnInit, OnChanges, FilterComponent {
  @Output() filter = new EventEmitter<ProductRequest>();
  @Input() originalPriceRange: NumberRange;
  @Input() retailPriceRange: NumberRange;
  selectedOriginalPriceRange: NumberRange = {
    minimum: 0,
    maximum: 10000
  };
  selectedRetailPriceRange: NumberRange = {
    minimum: 0,
    maximum: 10000
  };
  isInputChangeComingFromParentComponent = true;
  originalPriceSliderOptions: Options;
  retailPriceSliderOptions: Options;
  filterForm: FormGroup;
  showCategories = true;

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.setSliderOptions();
  }

  ngOnChanges() {
    if (this.isInputChangeComingFromParentComponent) {
      this.setSliderOptions();
      this.setSelectedRanges();
    }
  }

  submitFilters(): void {
    this.isInputChangeComingFromParentComponent = false;
    this.filter.emit(this.buildRequest());
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.submitFilters();
  }

  buildRequest(): ProductRequest {
    return {
      name: this.name.value ? this.name.value : '',
      minimumRetailPrice: this.selectedRetailPriceRange.minimum,
      maximumRetailPrice: this.selectedRetailPriceRange.maximum,
      minimumOriginalPrice: this.selectedOriginalPriceRange.minimum,
      maximumOriginalPrice: this.selectedOriginalPriceRange.maximum
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      name: ['']
    });
  }

  setSliderOptions() {
    this.originalPriceSliderOptions = {
      floor: isRangeValid(this.originalPriceRange)
        ? this.originalPriceRange.minimum
        : 0,
      ceil: isRangeValid(this.originalPriceRange)
        ? this.originalPriceRange.maximum
        : 100000,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
    this.retailPriceSliderOptions = {
      floor: isRangeValid(this.retailPriceRange)
        ? this.retailPriceRange.minimum
        : 0,
      ceil: isRangeValid(this.retailPriceRange)
        ? this.retailPriceRange.maximum
        : 100000,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
  }

  setSelectedRanges() {
    this.selectedOriginalPriceRange = this.originalPriceRange;
    this.selectedRetailPriceRange = this.retailPriceRange;
  }

  get name() {
    return this.filterForm.get('name');
  }

  get isFormEmpty() {
    return !this.name.value;
  }

  showCategoriesModal() {
    this.showCategories = true;
  }
}
