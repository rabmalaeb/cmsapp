import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  categoryForm: FormGroup;
  actionType: ActionType;
  category: Category;
  isLoadingCategory = false;
  isLoadingCategories = false;
  isLoading = false;
  categories: Category[] = [];

  ngOnInit() {
    this.getCategories();
    this.route.params.forEach(param => {
      if (param.id) {
        this.getCategory(param.id);
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

  getCategory(id: number) {
    this.isLoadingCategory = true;
    this.categoryService.getCategory(id).subscribe(response => {
      this.isLoadingCategory = false;
      this.category = response;
      this.buildForm();
    }, error => {
      this.isLoading = false;
      this.errorHandler.handleErrorResponse(error);
    });
  }

  buildForm() {
    let name = '';
    let description = '';
    let parentId;
    if (this.category) {
      name = this.category.name;
      description = this.category.description;
      parentId = this.category.parentId;
    }
    this.categoryForm = this.form.group({
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
      parentId: [parentId, [Validators.required]],
    });
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

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.categoryForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.category) {
      this.updateCategory(this.buildCategoryParams());
    } else {
      this.addCategory(this.buildCategoryParams());
    }
  }

  buildCategoryParams(): Category {
    const category = new Category();
    category.name = this.name.value;
    category.description = this.description.value;
    category.parentId = this.parentId.value;
    return category;
  }

  addCategory(params) {
    this.isLoading = true;
    this.categoryService
      .addCategory(params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Category added successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  updateCategory(params) {
    this.isLoading = true;
    const id = this.category.id;
    this.categoryService
      .updateCategory(id, params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Category updated successfully');
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
      return 'View Category';
    }
    return 'Add Category';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditCategory() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.CATEGORIES);
  }
}
