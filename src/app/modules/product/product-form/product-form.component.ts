import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { ActionType } from 'src/app/shared/models/general';
import { Product } from '../product';
import { Category } from '../../category/category';
import { FormService } from 'src/app/core/services/form.service';
import { Brand } from '../../brand/brand';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  @Input() product: Product;
  @Input() categories: Category[];
  @Input() brands: Brand[];
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditProduct = false;
  @Input() actionError: boolean;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Product>();
  formGroupDirective: FormGroupDirective;
  productForm: FormGroup;
  productImage: File;
  resetImage = false;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || this.actionError && this.productForm) {
      return false;
    }
    if (this.product) {
      this.buildExistingProductForm();
    } else {
      this.buildNewProductForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
        this.resetImage = true;
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
      code: [''],
      brandId: ['', [Validators.required]],
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
      brandId: [this.product.brandId, [Validators.required]],
      code: [this.product.code],
      unitOfCount: [this.product.unitOfCount, [Validators.required]]
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get brandId() {
    return this.productForm.get('brandId');
  }

  get manufacturer() {
    return this.productForm.get('manufacturer');
  }

  get code() {
    return this.productForm.get('code');
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
    if (!this.formService.isFormValid(this.productForm)) {
      return false;
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
    product.brandId = this.brandId.value;
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

  get isUpdate() {
    return this.actionType === ActionType.EDIT;
  }
}
