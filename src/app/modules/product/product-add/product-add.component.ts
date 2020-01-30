import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { Category } from '../../category/category';
import { MediaService } from '../../media/media.service';
import { Media } from '../../media/media';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { ProductStoreSelectors, ProductStoreActions } from '../store';
import { filter, map } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { CategoryStoreSelectors, CategoryStoreActions } from '../../category/store';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private mediaService: MediaService
  ) {}

  productForm: FormGroup;
  actionType: ActionType;
  product: Product;
  isLoadingProduct = false;
  isLoadingCategories = false;
  isLoading = false;
  categories: Category[] = [];
  categories$: Observable<Category[]>;
  productImage: File;
  productMedia: Media;
  imageUrl: any;
  product$: Observable<Product>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<String[]>;
  actionErrors$: Observable<String[]>;

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
        this.buildNewProductForm();
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
      .subscribe(() => {
        this.notificationService.showError(
          'An Error has Occurred. Please try again'
        );
      });
  }

  getProduct(id: number) {
    this.store$.dispatch(new ProductStoreActions.GetProductRequestAction(id));
    this.product$ = this.store$.select(
      ProductStoreSelectors.selectProductById(id)
    );
    this.loadingErrors$ = this.store$.select(
      ProductStoreSelectors.selectProductLoadingError
    );
    this.buildExistingProductForm();
  }

  buildNewProductForm() {
    this.productForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    });
  }

  buildExistingProductForm() {
    this.product$.subscribe(product => {
      this.product = product;
      this.productForm = this.form.group({
        name: [product.name, [Validators.required]],
        description: [product.description, [Validators.required]],
        categoryId: [product.categoryId, [Validators.required]]
      });
    });
  }

  getCategories() {
    this.store$.dispatch(new CategoryStoreActions.LoadRequestAction());
    this.categories$ = this.store$.select(CategoryStoreSelectors.selectAllCategoryItems);
  }

  // getProduct(id: number) {
  //   this.isLoadingProduct = true;
  //   this.productService.getProduct(id).subscribe(response => {
  //     this.isLoadingProduct = false;
  //     this.product = response;
  //     if (this.product.media) {
  //       this.imageUrl = this.product.media.imageUrl;
  //     }
  //     this.buildForm();
  //   }, error => {
  //     this.isLoading = false;
  //     this.errorHandler.handleErrorResponse(error);
  //   });
  // }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get categoryId() {
    return this.productForm.get('categoryId');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.productForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.productImage) {
      const data = new FormData();
      data.append('image', this.productImage, this.productImage.name);
      this.mediaService.addMedia(data).subscribe(response => {
        this.productMedia = response;
        if (this.product) {
          this.updateProduct(this.buildProductParams());
        } else {
          this.addProduct(this.buildProductParams());
        }
      });
    }
  }

  buildProductParams(): Product {
    const product = new Product();
    product.name = this.name.value;
    product.description = this.description.value;
    product.categoryId = this.categoryId.value;
    product.mediaId = this.productMedia.id;
    return product;
  }

  addProduct(params: Product) {
    this.store$.dispatch(
      new ProductStoreActions.AddProductRequestAction(params)
    );
  }

  updateProduct(params: Product) {
    const id = this.product.id;
    this.store$.dispatch(
      new ProductStoreActions.UpdateProductRequestAction(id, params)
    );
  }

  get buttonLabel() {
    return this.isLoadingAction$.pipe(
      map(isLoading => {
        if (isLoading) {
          return 'Loading';
        }
        if (this.actionType === ActionType.EDIT) {
          return 'Update';
        }
        return 'Add';
      })
    );
  }
  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Product';
    }
    return 'Add Product';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  uploadImage(image: File) {
    this.productImage = image;
  }

  get canEditProduct() {
    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.PRODUCTS)
    );
  }
}
