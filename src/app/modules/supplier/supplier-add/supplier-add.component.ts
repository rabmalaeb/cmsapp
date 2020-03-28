import { Component, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable, of } from 'rxjs';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';
import { SupplierStoreSelectors, SupplierStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  actionType: ActionType;
  supplier$: Observable<Supplier>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
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
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_SUPPLIER_FAILURE ||
            action.type === ActionTypes.ADD_SUPPLIER_FAILURE
        )
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
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
}
