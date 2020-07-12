import { Component, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { BrandStoreSelectors, BrandStoreActions } from '../store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { Brand } from '../brand';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  actionType: ActionType;
  brand$: Observable<Brand>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getBrand(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      BrandStoreSelectors.selectBrandActionError
    );

    this.isLoadingAction$ = this.store$.select(
      BrandStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      BrandStoreSelectors.selectIsLoadingItem
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_LANGUAGE_SUCCESS ||
            action.type === ActionTypes.ADD_LANGUAGE_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Brand Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Brand Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_LANGUAGE_FAILURE ||
            action.type === ActionTypes.ADD_LANGUAGE_FAILURE
        )
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getBrand(id: number) {
    this.store$.dispatch(new BrandStoreActions.GetBrandRequestAction(id));
    this.brand$ = this.store$.select(
      BrandStoreSelectors.selectBrandById(id)
    );
    this.loadingErrors$ = this.store$.select(
      BrandStoreSelectors.selectBrandLoadingError
    );
  }

  performAction(brand: Brand) {
    if (this.actionType === ActionType.EDIT) {
      this.updateBrand(brand);
    } else {
      this.addBrand(brand);
    }
  }

  addBrand(brand: Brand) {
    this.store$.dispatch(
      new BrandStoreActions.AddBrandRequestAction(brand)
    );
  }

  updateBrand(brand: Brand) {
    const id = brand.id;
    this.store$.dispatch(
      new BrandStoreActions.UpdateBrandRequestAction(id, brand)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Brand';
    }
    return 'Add Brand';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditBrand$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.LANGUAGES)
    );
  }
}
