import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Product, ProductFilterLimits } from '../product';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { filter } from 'rxjs/operators';
import { ProductStoreActions, ProductStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable, Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Category } from '../../category/category';
import {
  CategoryStoreActions,
  CategoryStoreSelectors,
} from '../../category/store';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';
import { BrandStoreActions, BrandStoreSelectors } from '../../brand/store';
import { Brand } from '../../brand/brand';
import {
  ManufacturerStoreActions,
  ManufacturerStoreSelectors,
} from '../../manufacturer/store';
import { Manufacturer } from '../../manufacturer/manufacturer';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'category', 'image', 'action'];
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  manufacturers$: Observable<Manufacturer[]>;
  brands$: Observable<Brand[]>;
  error$: Observable<string>;
  totalNumberOfItems$: Observable<number>;
  productFilterLimits$: Observable<ProductFilterLimits>;
  isLoading$: Observable<boolean>;
  dataSource: MatTableDataSource<any>;
  subscriptions: Subscription[] = [];
  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {
    super();
    this.fetchListAction = this.getProducts;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getProductFilterLimits();
    this.getCategories();
    this.getBrands();
    this.getManufacturers();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.error$ = this.store$.select(
      ProductStoreSelectors.selectProductLoadingError
    );

    this.isLoading$ = this.store$.select(
      ProductStoreSelectors.selectProductIsLoading
    );

    this.totalNumberOfItems$ = this.store$.select(
      ProductStoreSelectors.selectTotalNumberOfItems
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_PRODUCT_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(SuccessMessages.PRODUCT_DELETED);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_PRODUCT_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  filterProducts() {
    this.resetPaginator();
    this.getProducts();
  }

  resetPaginator() {
    this.paginator.pageIndex = 0;
  }

  getProducts() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new ProductStoreActions.LoadRequestAction(request));
    this.products$ = this.store$.select(
      ProductStoreSelectors.selectAllProductItems
    );
  }

  getCategories() {
    this.store$.dispatch(new CategoryStoreActions.LoadRequestAction());
    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );
  }

  getBrands() {
    this.store$.dispatch(new BrandStoreActions.LoadRequestAction());
    this.brands$ = this.store$.select(BrandStoreSelectors.selectAllBrandItems);
  }

  getProductFilterLimits() {
    this.store$.dispatch(
      new ProductStoreActions.GetProductFilterLimitsRequestAction()
    );
    this.productFilterLimits$ = this.store$.select(
      ProductStoreSelectors.selectProductFilterLimits
    );
  }

  getManufacturers() {
    this.store$.dispatch(new ManufacturerStoreActions.LoadRequestAction());
    this.manufacturers$ = this.store$.select(
      ManufacturerStoreSelectors.selectAllManufacturerItems
    );
  }

  addProduct() {
    this.router.navigate(['products/add']);
  }

  editProduct(id: number) {
    this.router.navigate([`products/${id}/view`]);
  }

  viewProduct(id: number) {
    this.router.navigate([`product/${id}`]);
  }

  deleteProduct(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new ProductStoreActions.DeleteProductRequestAction(id)
      );
    });
  }

  get canAddProduct() {
    return this.authorizationService.canAdd(ModuleName.PRODUCTS);
  }

  get canDeleteProduct() {
    return this.authorizationService.canDelete(ModuleName.PRODUCTS);
  }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
