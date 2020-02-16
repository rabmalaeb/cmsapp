import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { ProductStoreSelectors, ProductStoreActions } from '../store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import {
  CategoryStoreSelectors,
  CategoryStoreActions
} from '../../category/store';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  actionType: ActionType;
  product$: Observable<Product>;
  categories$: Observable<Category[]>;
  isLoading$: Observable<boolean>;
  isLoadingCategories$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.getCategories();
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getProduct(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      ProductStoreSelectors.selectProductActionError
    );

    this.isLoadingAction$ = this.store$.select(
      ProductStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PRODUCT_SUCCESS ||
            action.type === ActionTypes.ADD_PRODUCT_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Product Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Product Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PRODUCT_FAILURE ||
            action.type === ActionTypes.ADD_PRODUCT_FAILURE
        )
      )
      .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getProduct(id: number) {
    this.store$.dispatch(new ProductStoreActions.GetProductRequestAction(id));
    this.product$ = this.store$.select(
      ProductStoreSelectors.selectProductById(id)
    );
    this.isLoading$ = this.store$.select(
      ProductStoreSelectors.selectIsLoadingItem
    );
    this.loadingErrors$ = this.store$.select(
      ProductStoreSelectors.selectProductLoadingError
    );
  }

  getCategories() {
    this.store$.dispatch(new CategoryStoreActions.LoadRequestAction());
    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );
    this.isLoadingCategories$ = this.store$.select(
      CategoryStoreSelectors.selectIsLoadingItem
    );
  }

  performAction(product: Product) {
    if (this.actionType === ActionType.EDIT) {
      this.updateProduct(product);
    } else {
      this.addProduct(product);
    }
  }

  addProduct(product: Product) {
    this.store$.dispatch(
      new ProductStoreActions.AddProductRequestAction(product)
    );
  }

  updateProduct(product: Product) {
    const id = product.id;
    this.store$.dispatch(
      new ProductStoreActions.UpdateProductRequestAction(id, product)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Product';
    }
    return 'Add Product';
  }

  get canEditProduct$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.PRODUCTS)
    );
  }
}
