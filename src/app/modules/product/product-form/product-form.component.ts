import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ALERT_MESSAGES } from 'src/app/shared/models/alert';
import { Product } from '../product';
import { Category } from '../../category/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  @Input() product: Product;
  @Input() categories: Category[];
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditProduct = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Product>();
  formGroupDirective: FormGroupDirective;
  productForm: FormGroup;
  productImage: File;
  imageUrl: any;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    if (this.product) {
      this.buildExistingProductForm();
    } else {
      this.buildNewProductForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewProductForm() {
    this.productForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      retailPrice: ['', [Validators.required]],
      originalPrice: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unitOfCount: ['', [Validators.required]]
    });
  }

  buildExistingProductForm() {
    this.productForm = this.form.group({
      id: [this.product.id],
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      categoryId: [this.product.categoryId, [Validators.required]],
      retailPrice: [this.product.retailPrice, [Validators.required]],
      originalPrice: [this.product.originalPrice, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      unitOfCount: [this.product.unitOfCount, [Validators.required]]
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get retailPrice() {
    return this.productForm.get('retailPrice');
  }

  get originalPrice() {
    return this.productForm.get('originalPrice');
  }

  get quantity() {
    return this.productForm.get('quantity');
  }

  get unitOfCount() {
    return this.productForm.get('unitOfCount');
  }

  get categoryId() {
    return this.productForm.get('categoryId');
  }

  get buttonLabel() {
    if (this.isLoadingAction) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.productForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    this.submitForm.emit(this.buildProductParams());
  }

  buildProductParams(): Product {
    const product = new Product();
    if (this.productForm.get('id')) {
      product.id = this.productForm.get('id').value;
    }
    product.name = this.name.value;
    product.description = this.description.value;
    product.categoryId = this.categoryId.value;
    product.retailPrice = this.retailPrice.value;
    product.originalPrice = this.originalPrice.value;
    product.quantity = this.quantity.value;
    product.unitOfCount = this.unitOfCount.value;
    if (this.productImage) {
      product.image = this.productImage;
    }
    return product;
  }

  uploadImage(image: File) {
    this.productImage = image;
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.product && this.isLoading;
  }
}
