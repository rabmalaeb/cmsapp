import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable, of, Subscription } from 'rxjs';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';
import { SupplierStoreSelectors, SupplierStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Supplier } from '../supplier';
import { BaseActionComponent } from 'src/app/shared/base/base-action/base-action.component';
import { Labels } from 'src/app/shared/models/input';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss'],
})
export class SupplierAddComponent
  extends BaseActionComponent
  implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {
    super();
  }

  supplier$: Observable<Supplier>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach((param) => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getSupplier(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      SupplierStoreSelectors.selectSupplierActionError
    );

    this.isLoadingAction$ = this.store$.select(
      SupplierStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      SupplierStoreSelectors.selectIsLoadingItem
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_SUPPLIER_SUCCESS ||
              action.type === ActionTypes.ADD_SUPPLIER_SUCCESS
          )
        )
        .subscribe(() => {
          let message = 'Supplier Updated Successfully';
          if (this.actionType === ActionType.ADD) {
            message = 'Supplier Added Successfully';
          }
          this.notificationService.showSuccess(message);
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_SUPPLIER_FAILURE ||
              action.type === ActionTypes.ADD_SUPPLIER_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getSupplier(id: number) {
    this.store$.dispatch(new SupplierStoreActions.GetSupplierRequestAction(id));
    this.supplier$ = this.store$.select(
      SupplierStoreSelectors.selectSupplierById(id)
    );
    this.loadingErrors$ = this.store$.select(
      SupplierStoreSelectors.selectSupplierLoadingError
    );
  }

  performAction(supplier: Supplier) {
    if (this.actionType === ActionType.EDIT) {
      this.updateSupplier(supplier);
    } else {
      this.addSupplier(supplier);
    }
  }

  addSupplier(params: Supplier) {
    this.store$.dispatch(
      new SupplierStoreActions.AddSupplierRequestAction(params)
    );
  }

  updateSupplier(params: Supplier) {
    const id = params.id;
    this.store$.dispatch(
      new SupplierStoreActions.UpdateSupplierRequestAction(id, params)
    );
  }

  get buttonLabel() {
    return this.isLoadingAction$.pipe(
      map((isLoading) => {
        if (isLoading) {
          return Labels.LOADING;
        }
        if (this.actionType === ActionType.EDIT) {
          return Labels.UPDATE;
        }
        return Labels.ADD;
      })
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Supplier';
    }
    return 'Add Supplier';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditSupplier$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.SUPPLIERS)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
