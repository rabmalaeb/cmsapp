import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Permission, PermissionRequest } from '../permission';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PermissionService } from '../permission.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AppService } from 'src/app/services/app.service';
import { ALERT_MESSAGES, PermissionType, NavItem, ModuleName, ActionType } from 'src/app/models/general';
import { capitalize } from 'src/app/utils/general';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { PermissionStoreSelectors, PermissionStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private permissionService: PermissionService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private appService: AppService
  ) {}

  permissionForm: FormGroup;
  actionType: ActionType;
  permission: Permission;
  isLoadingPermission = false;
  isLoading = false;
  permissionTypes: PermissionType[] = [
    PermissionType.ADD,
    PermissionType.VIEW,
    PermissionType.EDIT,
    PermissionType.DELETE
  ];
  appModules: NavItem[] = [];
  selectedModel: string;
  permission$: Observable<Permission>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<String[]>;
  actionErrors$: Observable<String[]>;

  ngOnInit() {
    this.getAppModules();
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getPermission(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewPermissionForm();
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
      .subscribe(() => {
        this.notificationService.showError(
          'An Error has Occurred. Please try again'
        );
      });
  }

  getPermission(id: number) {
    this.store$.dispatch(new PermissionStoreActions.GetPermissionRequestAction(id));
    this.permission$ = this.store$.select(PermissionStoreSelectors.selectPermissionById(id));
    this.loadingErrors$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionLoadingError
    );
    this.buildExistingPermissionForm();
  }

  buildNewPermissionForm() {
    this.permissionForm = this.form.group({
      modules: ['', [Validators.required]],
      permissionType: ['', [Validators.required]]
    });
  }

  buildExistingPermissionForm() {
    this.permission$.subscribe(permission => {
      this.permission = permission;
      this.permissionForm = this.form.group({
        modules: [permission.group.toLowerCase(), [Validators.required]],
        permissionType: [permission.type, [Validators.required]]
      });
    });
  }

  getAppModules() {
    this.appModules = this.appService.activeNavBarItems;
  }

  get modules() {
    return this.permissionForm.get('modules');
  }

  get permissionType() {
    return this.permissionForm.get('permissionType');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.permissionForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.permission) {
      this.updatePermission(this.buildPermissionParams());
    } else {
      this.addPermission(this.buildPermissionParams());
    }
  }

  buildPermissionParams(): PermissionRequest {
    return {
      name: `Can ${capitalize(this.permissionType.value)} ${
        this.modules.value
      }`,
      type: this.permissionType.value,
      group: this.modules.value
    };
  }

  addPermission(params: PermissionRequest) {
    this.store$.dispatch(new PermissionStoreActions.AddPermissionRequestAction(params));
  }

  updatePermission(params: PermissionRequest) {
    const id = this.permission.id;
    this.store$.dispatch(
      new PermissionStoreActions.UpdatePermissionRequestAction(id, params)
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
      return 'View Permission';
    }
    return 'Add Permission';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditPermission() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.PERMISSIONS);
  }
}
