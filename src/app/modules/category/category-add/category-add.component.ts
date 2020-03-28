import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryRequest } from '../category';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { map, filter } from 'rxjs/operators';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { CategoryStoreSelectors, CategoryStoreActions } from '../store';
import { ActionTypes } from '../store/actions';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  categoryForm: FormGroup;
  actionType: ActionType;
  categories: Category[] = [];
  category$: Observable<Category>;
  categories$: Observable<Category[]>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

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

    this.isLoading$ = this.store$.select(
      CategoryStoreSelectors.selectIsLoadingItem
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
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
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
  }

  getCategories(categoryRequest: CategoryRequest = null) {
    this.store$.dispatch(new CategoryStoreActions.LoadRequestAction(categoryRequest));
    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );
  }

  performAction(category: Category) {
    if (this.actionType === ActionType.EDIT) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  addCategory(category: Category) {
    this.store$.dispatch(
      new CategoryStoreActions.AddCategoryRequestAction(category)
    );
  }

  updateCategory(category: Category) {
    const id = category.id;
    this.store$.dispatch(
      new CategoryStoreActions.UpdateCategoryRequestAction(id, category)
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

  get canEditCategory$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.CATEGORIES)
    );
  }
}
