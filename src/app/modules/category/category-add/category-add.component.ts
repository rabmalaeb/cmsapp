import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { map, filter } from 'rxjs/operators';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { CategoryStoreSelectors, CategoryStoreActions } from '../store';
import { ActionTypes } from '../store/actions';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  categoryForm: FormGroup;
  actionType: ActionType;
  category: Category;
  isLoadingCategory = false;
  isLoadingCategories = false;
  isLoading = false;
  categories: Category[] = [];
  category$: Observable<Category>;
  categories$: Observable<Category[]>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<String[]>;
  actionErrors$: Observable<String[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.getCategories();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getCategory(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewCategoryForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      CategoryStoreSelectors.selectCategoryActionError
    );

    this.isLoadingAction$ = this.store$.select(
      CategoryStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_CATEGORY_SUCCESS ||
            action.type === ActionTypes.ADD_CATEGORY_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Category Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Category Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_CATEGORY_FAILURE ||
            action.type === ActionTypes.ADD_CATEGORY_FAILURE
        )
      )
      .subscribe(() => {
        this.notificationService.showError(
          'An Error has Occurred. Please try again'
        );
      });
  }

  getCategory(id: number) {
    this.store$.dispatch(new CategoryStoreActions.GetCategoryRequestAction(id));
    this.category$ = this.store$.select(
      CategoryStoreSelectors.selectCategoryById(id)
    );
    this.loadingErrors$ = this.store$.select(
      CategoryStoreSelectors.selectCategoryLoadingError
    );
    this.buildExistingCategoryForm();
  }

  buildNewCategoryForm() {
    this.categoryForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      parentId: ['', [Validators.required]]
    });
  }

  buildExistingCategoryForm() {
    this.category$.subscribe(category => {
      this.category = category;
      this.categoryForm = this.form.group({
        name: [category.name, [Validators.required]],
        description: [category.description, [Validators.required]],
        parentId: [category.parentId, [Validators.required]]
      });
    });
  }

  getCategories() {
    this.store$.dispatch(new CategoryStoreActions.LoadRequestAction());
    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );
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

  addCategory(params: Category) {
    this.store$.dispatch(
      new CategoryStoreActions.AddCategoryRequestAction(params)
    );
  }

  updateCategory(params: Category) {
    const id = this.category.id;
    this.store$.dispatch(
      new CategoryStoreActions.UpdateCategoryRequestAction(id, params)
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
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.CATEGORIES)
    );
  }
}
