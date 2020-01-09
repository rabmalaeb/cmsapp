import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, USER_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { MediaService } from '../../media/media.service';
import { Media } from '../../media/media';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private errorHandler: ErrorHandlerService,
    private authorizationService: AuthorizationService,
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
  productImage: File;
  productMedia: Media;
  imageUrl: any;

  ngOnInit() {
    this.getCategories();
    this.route.params.forEach(param => {
      if (param.id) {
        this.getProduct(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getCategories() {
    this.isLoadingCategories = true;
    this.categoryService.getCategories().subscribe(categories => {
      this.isLoadingCategories = false;
      this.categories = categories;
    }, error => {
      this.errorHandler.handleErrorResponse(error);
      this.isLoadingCategories = false;
    });
  }

  getProduct(id: number) {
    this.isLoadingProduct = true;
    this.productService.getProduct(id).subscribe(response => {
      this.isLoadingProduct = false;
      this.product = response;
      if (this.product.media) {
        this.imageUrl = this.product.media.imageUrl;
      }
      this.buildForm();
    }, error => {
      this.isLoading = false;
      this.errorHandler.handleErrorResponse(error);
    });
  }

  buildForm() {
    let name = '';
    let description = '';
    let categoryId;
    if (this.product) {
      name = this.product.name;
      description = this.product.description;
      categoryId = this.product.categoryId;
    }
    this.productForm = this.form.group({
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
      categoryId: [categoryId, [Validators.required]],
    });
  }

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
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
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

  addProduct(params) {
    this.isLoading = true;
    this.productService
      .addProduct(params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Product added successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  updateProduct(params) {
    this.isLoading = true;
    const id = this.product.id;
    this.productService
      .updateProduct(id, params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Product updated successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  get buttonLabel() {
    if (this.isLoading) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
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
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.PRODUCTS);
  }
}
