import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Product, ProductRequest, ProductFilterLimits } from '../product';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/general';
import { filter } from 'rxjs/operators';
import { ProductStoreActions, ProductStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable, Subject } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Category } from '../../category/category';
import { CategoryStoreActions, CategoryStoreSelectors } from '../../category/store';
import { PaginationControl } from 'src/app/shared/paginator';

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
  totalNumberOfProducts$: Observable<number>;
  productFilterLimits$: Observable<ProductFilterLimits>;
  isLoading$: Observable<boolean>;
  filterSubject = new Subject<ProductRequest>();
  resetSubject = new Subject();
  paginatorControl: PaginationControl = {
    currentPage: 1,
    perPage: 20
  };
  productRequest: ProductRequest;
  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    this.setInitialRequest();
    this.getProducts(this.productRequest);
    this.getProductFilterLimits();
    this.getCategories();
    this.initializeStoreVariables();
  }

  setInitialRequest() {
    this.productRequest = {
      perPage: this.paginatorControl.perPage,
      currentPage: this.paginatorControl.currentPage
    };
  }

  initializeStoreVariables() {
    this.products$ = this.store$.select(
      ProductStoreSelectors.selectAllProductItems
    );

    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );

    this.productFilterLimits$ = this.store$.select(
      ProductStoreSelectors.selectProductFilterLimits
    );

    this.error$ = this.store$.select(
      ProductStoreSelectors.selectProductLoadingError
    );

    this.isLoading$ = this.store$.select(
      ProductStoreSelectors.selectProductIsLoading
    );

    this.totalNumberOfProducts$ = this.store$.select(
      ProductStoreSelectors.selectTotalNumberOfProducts
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

  filterProducts(productRequest: ProductRequest) {
    this.productRequest = productRequest;
    this.productRequest.perPage = this.paginatorControl.perPage;
    this.resetPaginator();
    this.getProducts(productRequest);
  }

  getProducts(productRequest: ProductRequest = null) {
    this.store$.dispatch(
      new ProductStoreActions.LoadRequestAction(productRequest)
    );
  }

  getProductFilterLimits() {
    this.store$.dispatch(
      new ProductStoreActions.GetProductFilterLimitsRequestAction()
    );
  }

  resetPaginator() {
    this.paginator.pageIndex = 0;
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

  setPage($event: PageEvent) {
    this.productRequest.perPage = $event.pageSize;
    this.productRequest.currentPage = $event.pageIndex + 1;
    this.paginatorControl.currentPage = $event.pageIndex + 1;
    this.paginatorControl.perPage = $event.pageSize;
    this.getProducts(this.productRequest);
  }

  get canAddProduct() {
    return this.authorizationService.canAdd(ModuleName.PRODUCTS);
  }

  get canDeleteProduct() {
    return this.authorizationService.canDelete(ModuleName.PRODUCTS);
  }
}
