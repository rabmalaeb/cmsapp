import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin, AdminRequest } from '../admin';
import { Role } from '../../role/role';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable, of, Subscription } from 'rxjs';
import { AdminStoreSelectors, AdminStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  RootStoreState,
  RoleStoreSelectors,
  RoleStoreActions,
  PartnerStoreActions,
  PartnerStoreSelectors,
} from 'src/app/root-store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { Partner } from '../../partner/partner';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Country } from '../../country/country';
import {
  CountryStoreActions,
  CountryStoreSelectors,
} from '../../country/store';
import { BaseActionComponent } from 'src/app/shared/base/base-action/base-action.component';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
})
export class AdminAddComponent
  extends BaseActionComponent
  implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private authorizationService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {
    super();
  }
  actionType: ActionType;
  roles$: Observable<Role[]>;
  partners$: Observable<Partner[]>;
  countries$: Observable<Country[]>;
  admin$: Observable<Admin>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    const partnerId = this.authenticationService.getCurrentUser().partnerId;
    this.getRoles(partnerId);
    this.getCountries();
    this.initializeStoreVariables();
    this.getPartners();
    this.route.params.forEach((param) => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getAdmin(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      AdminStoreSelectors.selectAdminActionError
    );

    this.isLoading$ = this.store$.select(
      AdminStoreSelectors.selectIsLoadingItem
    );

    this.isLoadingAction$ = this.store$.select(
      AdminStoreSelectors.selectIsLoadingAction
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_ADMIN_SUCCESS ||
              action.type === ActionTypes.ADD_ADMIN_SUCCESS
          )
        )
        .subscribe(() => {
          let message = 'Admin Updated Successfully';
          if (this.actionType === ActionType.ADD) {
            message = 'Admin Added Successfully';
          }
          this.notificationService.showSuccess(message);
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_ADMIN_FAILURE ||
              action.type === ActionTypes.ADD_ADMIN_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getCountries() {
    this.store$.dispatch(new CountryStoreActions.LoadRequestAction());
    this.countries$ = this.store$.select(
      CountryStoreSelectors.selectAllCountryItems
    );
  }

  getAdmin(id: number) {
    this.store$.dispatch(new AdminStoreActions.GetAdminRequestAction(id));
    this.admin$ = this.store$.select(AdminStoreSelectors.selectAdminById(id));
    this.loadingErrors$ = this.store$.select(
      AdminStoreSelectors.selectAdminLoadingError
    );
  }

  getRoles(partnerId: number) {
    this.store$.dispatch(
      new RoleStoreActions.GetRolesByPartnerRequestAction(partnerId)
    );
    this.roles$ = this.store$.select(
      RoleStoreSelectors.selectRoleByPartnerId(partnerId)
    );
  }

  getPartners() {
    this.store$.dispatch(new PartnerStoreActions.LoadRequestAction());
    this.partners$ = this.store$.select(
      PartnerStoreSelectors.selectAllPartnerItems
    );
  }

  performAction(adminRequest: AdminRequest) {
    if (this.actionType === ActionType.EDIT) {
      this.updateAdmin(adminRequest);
    } else {
      this.addAdmin(adminRequest);
    }
  }

  addAdmin(adminRequest: AdminRequest) {
    this.store$.dispatch(
      new AdminStoreActions.AddAdminRequestAction(adminRequest)
    );
  }

  updateAdmin(adminRequest: AdminRequest) {
    const id = adminRequest.id;
    this.store$.dispatch(
      new AdminStoreActions.UpdateAdminRequestAction(id, adminRequest)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Admin';
    }
    return 'Add Admin';
  }

  get canEditAdmin$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.ADMINS)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
