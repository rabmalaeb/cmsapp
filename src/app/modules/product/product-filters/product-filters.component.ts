import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductRequest, ProductFilterLimits } from '../product';
import { Options, LabelType } from 'ng5-slider';
import { NumberRange, OptionItem } from 'src/app/shared/models/general';
import { Category } from '../../category/category';
import { FilterHandler, FilterComponent } from 'src/app/shared/filters/filter';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.sass']
})
export class ProductFiltersComponent
  implements OnInit, OnChanges, FilterComponent {
  @Input() filterHandler: FilterHandler;
  @Input() productFilterLimits: ProductFilterLimits;
  @Input() categories: Category[];

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
    this.sendInitialRequest();
    this.buildForm();
    this.buildCategoryOptionItems();
  }

  sendInitialRequest() {
    const request: ProductRequest = {
      currentPage: 1
    };
    this.filterHandler.setRequest(request);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.productFilterLimits && this.productFilterLimits) {
      this.setSliderOptions();
      this.setSelectedRanges();
    }
    if (changes.categories) {
      this.buildCategoryOptionItems();
    }
    if (changes.filterHandler) {
      this.filterHandler.resetSubject.subscribe(() => this.resetFilters());
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
    this.filterHandler.setRequest(this.buildRequest());
  }

  /**
   * build the product request which is sent to the filter control through the filter subject
   * the currentPage is always 1 since we always return the first page of the filtered list
   */
  buildRequest(): ProductRequest {
    const productRequest = {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
      minimumRetailPrice: this.selectedRetailPriceRange.minimum,
      maximumRetailPrice: this.selectedRetailPriceRange.maximum,
      minimumOriginalPrice: this.selectedOriginalPriceRange.minimum,
      maximumOriginalPrice: this.selectedOriginalPriceRange.maximum,
      currentPage: 1,
      'categories[]': this.getSelectedCategories()
    };
    return productRequest;
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
   * set the slider options
   */
  setSliderOptions() {
    this.originalPriceSliderOptions = {
      floor: this.productFilterLimits.minimumOriginalPrice,
      ceil: this.productFilterLimits.maximumOriginalPrice,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
    this.retailPriceSliderOptions = {
      floor: this.productFilterLimits.minimumRetailPrice,
      ceil: this.productFilterLimits.maximumRetailPrice,
      translate: (value: number, label: LabelType): string => {
        return '$' + value;
      }
    };
  }

  /**
   * set the slider ranges to their original values
   */
  setSelectedRanges() {
    this.selectedOriginalPriceRange = {
      minimum: this.productFilterLimits.minimumOriginalPrice,
      maximum: this.productFilterLimits.maximumOriginalPrice
    };
    this.selectedRetailPriceRange = {
      minimum: this.productFilterLimits.minimumRetailPrice,
      maximum: this.productFilterLimits.maximumRetailPrice
    };
  }

  /**
   * reset slider ranges to there original values
   */
  resetSliderRanges() {
    this.selectedOriginalPriceRange.minimum = this.productFilterLimits.minimumOriginalPrice;
    this.selectedOriginalPriceRange.maximum = this.productFilterLimits.maximumOriginalPrice;
    this.selectedRetailPriceRange.minimum = this.productFilterLimits.minimumRetailPrice;
    this.selectedRetailPriceRange.maximum = this.productFilterLimits.maximumRetailPrice;
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
