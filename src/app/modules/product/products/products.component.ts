import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';
import { filter } from 'rxjs/operators';
import { ProductStoreActions, ProductStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  products$: Observable<Product[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.products$ = this.store$.select(ProductStoreSelectors.selectAllProductItems);

    this.error$ = this.store$.select(ProductStoreSelectors.selectProductLoadingError);

    this.isLoading$ = this.store$.select(
      ProductStoreSelectors.selectProductIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.DELETE_PRODUCT_SUCCESS)
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Product Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.DELETE_PRODUCT_FAILURE)
      )
      .subscribe(() => {
        this.notificationService.showError('Could not delete Product. Please try again');
      });

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.LOAD_FAILURE)
      )
      .subscribe(() => {
        this.notificationService.showError('An Error has occurred. Please try again');
      });
  }

  getProducts() {
    this.store$.dispatch(new ProductStoreActions.LoadRequestAction());
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
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
        this.productService.deleteProduct(id).subscribe(response => {
          this.products = response;
          this.setDataSource();
        });
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
