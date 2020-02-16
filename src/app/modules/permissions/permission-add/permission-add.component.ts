import { Component, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Permission, PermissionRequest } from '../permission';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AppService } from 'src/app/services/app.service';
import {
  PermissionType,
  NavItem,
  ModuleName,
  ActionType
} from 'src/app/models/general';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { PermissionStoreSelectors, PermissionStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
  ) {}

  actionType: ActionType;
  isLoadingPermission = false;
  appModules: NavItem[] = [];
  selectedModel: string;
  permission$: Observable<Permission>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getPermission(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionActionError
    );

    this.isLoadingAction$ = this.store$.select(
      PermissionStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      PermissionStoreSelectors.selectIsLoadingItem
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PERMISSION_SUCCESS ||
            action.type === ActionTypes.ADD_PERMISSION_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Permission Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Permission Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PERMISSION_FAILURE ||
            action.type === ActionTypes.ADD_PERMISSION_FAILURE
        )
      )
      .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getPermission(id: number) {
    this.store$.dispatch(
      new PermissionStoreActions.GetPermissionRequestAction(id)
    );
    this.permission$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionById(id)
    );
    this.loadingErrors$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionLoadingError
    );
  }

  performAction(permissionRequest: PermissionRequest) {
    if (this.actionType === ActionType.EDIT) {
      this.updatePermission(permissionRequest);
    } else {
      this.addPermission(permissionRequest);
    }
  }

  addPermission(permission: PermissionRequest) {
    this.store$.dispatch(
      new PermissionStoreActions.AddPermissionRequestAction(permission)
    );
  }

  updatePermission(permission: PermissionRequest) {
    const id = permission.id;
    this.store$.dispatch(
      new PermissionStoreActions.UpdatePermissionRequestAction(id, permission)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Permission';
    }
    return 'Add Permission';
  }

  get canEditPermission$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.PERMISSIONS)
    );
  }
}
