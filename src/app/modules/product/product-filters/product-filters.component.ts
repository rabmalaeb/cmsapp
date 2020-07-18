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
import { Brand } from '../../brand/brand';
import { Manufacturer } from '../../manufacturer/manufacturer';

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
  @Input() brands: Brand[];
  @Input() manufacturers: Manufacturer[];

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
  brandsOptionItems: OptionItem[];
  manufacturersOptionItems: OptionItem[];

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.sendInitialRequest();
    this.buildForm();
    this.buildCategoryOptionItems();
    this.buildBrandOptionItems();
    this.buildManufacturersOptionItems();
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
    if (changes.brands) {
      this.buildBrandOptionItems();
    }
    if (changes.manufacturers) {
      this.buildManufacturersOptionItems();
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
    this.resetBrands();
    this.resetManufacturers();
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
    const productRequest: ProductRequest = {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
      minimumRetailPrice: this.selectedRetailPriceRange.minimum,
      maximumRetailPrice: this.selectedRetailPriceRange.maximum,
      minimumOriginalPrice: this.selectedOriginalPriceRange.minimum,
      maximumOriginalPrice: this.selectedOriginalPriceRange.maximum,
      currentPage: 1,
      'categories[]': this.getSelectedCategories(),
      'brands[]': this.getSelectedBrands(),
      'manufacturers[]': this.getSelectedManufacturers(),
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

  /**
   * get all categories that have selected = true
   */
  getSelectedBrands(): number[] {
    const selectedBrands = [];
    this.brandsOptionItems.forEach(option => {
      if (option.selected) {
        selectedBrands.push(option.value);
      }
    });
    return selectedBrands;
  }

  /**
   * get all categories that have selected = true
   */
  getSelectedManufacturers(): number[] {
    const selectedManufacturers = [];
    this.manufacturersOptionItems.forEach(option => {
      if (option.selected) {
        selectedManufacturers.push(option.value);
      }
    });
    return selectedManufacturers;
  }

  resetCategories() {
    this.categoryOptionItems.map(categories => (categories.selected = true));
  }

  resetBrands() {
    this.brandsOptionItems.map(brands => (brands.selected = true));
  }

  resetManufacturers() {
    this.manufacturersOptionItems.map(manufacturer => (manufacturer.selected = true));
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

  /**
   * build option items array from the categories array
   */
  buildBrandOptionItems(): void {
    this.brandsOptionItems = [];
    this.brands.forEach(brand => {
      this.brandsOptionItems.push(
        new OptionItem(brand.name, brand.id, true)
      );
    });
  }

  /**
   * build option items array from the categories array
   */
  buildManufacturersOptionItems(): void {
    this.manufacturersOptionItems = [];
    this.manufacturers.forEach(manufacturer => {
      this.manufacturersOptionItems.push(
        new OptionItem(manufacturer.name, manufacturer.id, true)
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
