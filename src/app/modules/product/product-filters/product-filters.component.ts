import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductRequest } from '../product';
import { Options, LabelType } from 'ng5-slider';
import { NumberRange, OptionItem } from 'src/app/shared/models/general';
import { isRangeValid } from 'src/app/shared/utils/general';
import { Category } from '../../category/category';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.sass']
})
export class ProductFiltersComponent
  implements OnInit, OnChanges, FilterComponent {
  @Output() filter = new EventEmitter<ProductRequest>();
  @Input() originalPriceRange: NumberRange;
  @Input() categories: Category[];
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
  categoryOptionItems: OptionItem[];

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.setSliderOptions();
    this.buildCategoryOptionItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isInputChangeComingFromParentComponent) {
      this.setSliderOptions();
      this.setSelectedRanges();
    }
    if (changes.categories) {
      this.buildCategoryOptionItems();
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
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
      minimumRetailPrice: this.selectedRetailPriceRange.minimum,
      maximumRetailPrice: this.selectedRetailPriceRange.maximum,
      minimumOriginalPrice: this.selectedOriginalPriceRange.minimum,
      maximumOriginalPrice: this.selectedOriginalPriceRange.maximum,
      'categories[]': this.getSelectedCategories()
    };
  }

  getSelectedCategories(): number[] {
    const selectedCategories = [];
    this.categoryOptionItems.forEach(option => {
      if (option.selected) {
        selectedCategories.push(option.value);
      }
    });
    return selectedCategories;
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      searchQuery: ['']
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

  get searchQuery() {
    return this.filterForm.get('searchQuery');
  }

  get isFormEmpty() {
    return !this.searchQuery.value;
  }

  buildCategoryOptionItems(): void {
    this.categoryOptionItems = [];
    this.categories.forEach(category => {
      this.categoryOptionItems.push(
        new OptionItem(category.name, category.id, true)
      );
    });
  }
}
