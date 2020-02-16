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
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES } from 'src/app/models/general';
import { Product } from '../product';
import { Media } from '../../media/media';
import { MediaService } from '../../media/media.service';
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
    private mediaService: MediaService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  productForm: FormGroup;
  productImage: File;
  productMedia: Media;
  imageUrl: any;
  @Input() product: Product;
  @Input() categories: Category[];
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditProduct = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Product>();
  formGroupDirective: FormGroupDirective;

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
      categoryId: ['', [Validators.required]]
    });
  }

  buildExistingProductForm() {
    this.productForm = this.form.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      categoryId: [this.product.categoryId, [Validators.required]]
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

  buildProductParams(): Product {
    const product = new Product();
    product.id = this.productForm.get('id')
      ? this.productForm.get('id').value
      : '';
    product.name = this.name.value;
    product.description = this.description.value;
    product.categoryId = this.categoryId.value;
    product.mediaId = this.productMedia.id;
    return product;
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
    if (this.productImage) {
      const data = new FormData();
      data.append('image', this.productImage, this.productImage.name);
      this.mediaService.addMedia(data).subscribe(response => {
        this.productMedia = response;
        this.submitForm.emit(this.buildProductParams());
      });
    }
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
