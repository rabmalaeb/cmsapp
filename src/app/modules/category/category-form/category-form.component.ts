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
import { Category } from '../category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  @Input() category: Category;
  @Input() categories: Category[];
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditCategory = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Category>();
  formGroupDirective: FormGroupDirective;
  categoryForm: FormGroup;
  bannerImage: File;
  resetImage = false;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    if (this.category) {
      this.buildExistingCategoryForm();
    } else {
      this.buildNewCategoryForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
        this.resetImage = true;
      }
    }
  }

  buildNewCategoryForm() {
    this.categoryForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      parentId: ['']
    });
  }

  buildExistingCategoryForm() {
    this.categoryForm = this.form.group({
      id: [this.category.id],
      name: [this.category.name, [Validators.required]],
      description: [this.category.description, [Validators.required]],
      parentId: [this.category.parentId]
    });
  }

  buildCategoryParams(): Category {
    const category = new Category();
    category.id = this.categoryForm.get('id')
      ? this.categoryForm.get('id').value
      : '';
    category.name = this.name.value;
    category.description = this.description.value;
    category.parentId = this.parentId.value;
    category.image = this.bannerImage;
    return category;
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
    if (!this.categoryForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    this.submitForm.emit(this.buildCategoryParams());
  }

  uploadImage(image: File) {
    this.bannerImage = image;
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.category && this.isLoading;
  }

  get name() {
    return this.categoryForm.get('name');
  }

  get description() {
    return this.categoryForm.get('description');
  }

  get parentId() {
    return this.categoryForm.get('parentId');
  }
}
