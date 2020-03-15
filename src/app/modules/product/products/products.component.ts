import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Product, ProductRequest } from '../product';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName, NumberRange } from 'src/app/shared/models/general';
import { filter } from 'rxjs/operators';
import { ProductStoreActions, ProductStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable, Subject } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Category } from '../../category/category';
import { CategoryStoreActions, CategoryStoreSelectors } from '../../category/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'image',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  error$: Observable<string>;
  retailPriceRange$: Observable<NumberRange>;
  originalPriceRange$: Observable<NumberRange>;
  isLoading$: Observable<boolean>;
  filterSubject = new Subject<ProductRequest>();
  resetSubject = new Subject();
  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.products$ = this.store$.select(
      ProductStoreSelectors.selectAllProductItems
    );

    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );

    this.originalPriceRange$ = this.store$.select(
      ProductStoreSelectors.selectOriginalPriceRange()
    );

    this.retailPriceRange$ = this.store$.select(
      ProductStoreSelectors.selectRetailPriceRange()
    );

    this.error$ = this.store$.select(
      ProductStoreSelectors.selectProductLoadingError
    );

    this.isLoading$ = this.store$.select(
      ProductStoreSelectors.selectProductIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PRODUCT_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Product Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PRODUCT_FAILURE
        )
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getProducts(productRequest: ProductRequest = null) {
    this.store$.dispatch(
      new ProductStoreActions.LoadRequestAction(productRequest)
    );
  }

  getCategories() {
    this.store$.dispatch(
      new CategoryStoreActions.LoadRequestAction()
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
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new ProductStoreActions.DeleteProductRequestAction(id)
        );
      }
    );
  }

  get canAddProduct() {
    return this.authorizationService.canAdd(ModuleName.PRODUCTS);
  }

  get canDeleteProduct() {
    return this.authorizationService.canDelete(ModuleName.PRODUCTS);
  }
}
