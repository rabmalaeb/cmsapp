import {
  Component,
  OnInit,
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
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.sass']
})
export class ProductFiltersComponent
  implements OnInit, OnChanges, FilterComponent {
  @Input() filter: Subject<ProductRequest>;
  @Input() resetSubject: Subject<boolean>;
  /**
   * original price input from parent component
   */
  @Input() originalPriceRange: NumberRange;

  /**
   * retail price input from parent component
   */
  @Input() retailPriceRange: NumberRange;
  @Input() categories: Category[];

  /**
   * store the default original price
   */
  defaultOriginalPriceRange: NumberRange = {
    minimum: 0,
    maximum: 10000
  };

  /**
   * store the default retail price
   */
  defaultRetailPriceRange: NumberRange = {
    minimum: 0,
    maximum: 10000
  };

  /**
   * store the original price selected by the user
   */
  selectedOriginalPriceRange: NumberRange = {
    minimum: 0,
    maximum: 10000
  };

  /**
   * store the retail price selected by the user
   */
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
    this.setSliderLimits();
    this.setSliderOptions();
    this.buildCategoryOptionItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isInputChangeComingFromParentComponent) {
      this.setSliderLimits();
      this.setSliderOptions();
      this.setSelectedRanges();
    }
    if (changes.categories) {
      this.buildCategoryOptionItems();
    }
    if (changes.resetSubject) {
      this.resetSubject.subscribe(() => this.resetFilters());
    }
  }

  /**
   * reset all the filters and then submit with the request
   */
  resetFilters(): void {
    this.resetCategories();
    this.resetSliderRanges();
    this.submitFilters();
  }

  /**
   * send the request to the filter control
   */
  submitFilters(): void {
    this.isInputChangeComingFromParentComponent = false;
    this.filter.next(this.buildRequest());
  }

  /**
   * build the product request which is sent to the filter control through the filter subject
   */
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

  /**
   * get all categories that have selected = true
   */
  getSelectedCategories(): number[] {
    const selectedCategories = [];
    this.categoryOptionItems.forEach(option => {
      if (option.selected) {
        selectedCategories.push(option.value);
      }
    });
    return selectedCategories;
  }

  resetCategories() {
    this.categoryOptionItems.map(categories => (categories.selected = true));
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      searchQuery: ['']
    });
  }

  /**
   * set the slider limits which is used to set the slider options
   */
  setSliderLimits() {
    this.defaultOriginalPriceRange.minimum = isRangeValid(
      this.originalPriceRange
    )
      ? this.originalPriceRange.minimum
      : 0;
    this.defaultOriginalPriceRange.maximum = isRangeValid(
      this.originalPriceRange
    )
      ? this.originalPriceRange.maximum
      : 100000;
    this.defaultRetailPriceRange.minimum = isRangeValid(this.retailPriceRange)
      ? this.retailPriceRange.minimum
      : 0;
    this.defaultRetailPriceRange.maximum = isRangeValid(this.retailPriceRange)
      ? this.retailPriceRange.maximum
      : 100000;
  }

  /**
   * set the slider options
   */
  setSliderOptions() {
    const retailPrice = this.defaultRetailPriceRange;
    const originalPrice = this.defaultRetailPriceRange;
    this.originalPriceSliderOptions = {
      floor: originalPrice.minimum,
      ceil: originalPrice.maximum,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
    this.retailPriceSliderOptions = {
      floor: retailPrice.minimum,
      ceil: retailPrice.maximum,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
  }

  /**
   * set the slider ranges to their original values
   */
  setSelectedRanges() {
    this.selectedOriginalPriceRange = this.originalPriceRange;
    this.selectedRetailPriceRange = this.retailPriceRange;
  }

  /**
   * reset slider ranges to there original values
   */
  resetSliderRanges() {
    const retailPrice = this.defaultRetailPriceRange;
    const originalPrice = this.defaultOriginalPriceRange;
    this.selectedOriginalPriceRange.minimum = originalPrice.minimum;
    this.selectedOriginalPriceRange.maximum = originalPrice.maximum;
    this.selectedRetailPriceRange.minimum = retailPrice.minimum;
    this.selectedRetailPriceRange.maximum = retailPrice.maximum;
  }

  /**
   * build option items array from the categories array
   */
  buildCategoryOptionItems(): void {
    this.categoryOptionItems = [];
    this.categories.forEach(category => {
      this.categoryOptionItems.push(
        new OptionItem(category.name, category.id, true)
      );
    });
  }

  get searchQuery() {
    return this.filterForm.get('searchQuery');
  }

  get isFormEmpty() {
    return !this.searchQuery.value;
  }
}
