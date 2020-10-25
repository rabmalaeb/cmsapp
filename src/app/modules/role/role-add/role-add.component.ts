import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { Role, RoleActionRequest } from '../role';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable, of, Subscription } from 'rxjs';
import { RoleStoreSelectors, RoleStoreActions } from '../store';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  RootStoreState,
  PartnerStoreActions,
  PartnerStoreSelectors
} from 'src/app/root-store';
import { filter } from 'rxjs/operators';
import {
  PermissionStoreActions,
  PermissionStoreSelectors
} from '../../permissions/store';
import { ActionTypes } from '../store/actions';
import { Partner } from '../../partner/partner';
import { Permission } from '../../permissions/permission';
import { BaseActionComponent } from 'src/app/shared/base/base-action/base-action.component';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss'],
})
export class RoleAddComponent extends BaseActionComponent implements OnInit, OnDestroy {
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
  permissions$: Observable<Permission[]>;
  role$: Observable<Role>;
  partners$: Observable<Partner[]>;
  actionType: ActionType;
  subscriptions: Subscription[] = [];
  role: Role;

  ngOnInit() {
    this.initializeStoreVariables();
    this.getPermissions();
    this.getPartners();
    this.route.params.forEach((param) => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getRole(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      RoleStoreSelectors.selectRoleActionError
    );

    this.isLoadingAction$ = this.store$.select(
      RoleStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      RoleStoreSelectors.selectIsLoadingItem
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_ROLE_SUCCESS ||
              action.type === ActionTypes.ADD_ROLE_SUCCESS
          )
        )
        .subscribe(() => {
          let message = 'Role Updated Successfully';
          if (this.actionType === ActionType.ADD) {
            message = 'Role Added Successfully';
          }
          this.notificationService.showSuccess(message);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_ROLE_FAILURE ||
              action.type === ActionTypes.ADD_ROLE_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getRole(id: number) {
    this.store$.dispatch(new RoleStoreActions.GetRoleRequestAction(id));
    this.role$ = this.store$.select(RoleStoreSelectors.selectRoleById(id));
    this.loadingErrors$ = this.store$.select(
      RoleStoreSelectors.selectRoleLoadingError
    );
  }

  getPartners() {
    this.store$.dispatch(new PartnerStoreActions.LoadRequestAction());
    this.partners$ = this.store$.select(
      PartnerStoreSelectors.selectAllPartnerItems
    );
  }

  getPermissions() {
    this.store$.dispatch(
      new PermissionStoreActions.LoadRequestAction({ perPage: 200 })
    );
    this.permissions$ = this.store$.select(
      PermissionStoreSelectors.selectAllPermissionItems
    );
  }

  performAction(role: RoleActionRequest) {
    if (this.actionType === ActionType.EDIT) {
      this.updateRole(role);
    } else {
      this.addRole(role);
    }
  }

  addRole(role: RoleActionRequest) {
    this.store$.dispatch(new RoleStoreActions.AddRoleRequestAction(role));
  }

  updateRole(role: RoleActionRequest) {
    const id = role.id;
    this.store$.dispatch(
      new RoleStoreActions.UpdateRoleRequestAction(id, role)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Role';
    }
    return 'Add Role';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditRole$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.ROLES)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
