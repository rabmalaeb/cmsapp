import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';
import { Observable } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  RootStoreState,
  RoleStoreSelectors,
  RoleStoreActions
} from 'src/app/root-store';
import { ActionTypes } from '../store/actions';
import { NotificationService } from 'src/app/services/notification.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  isLoading = false;
  roles: Role[] = [];

  roles$: Observable<Role[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoles();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.roles$ = this.store$.select(RoleStoreSelectors.selectAllRoleItems);

    this.error$ = this.store$.select(RoleStoreSelectors.selectRoleLoadingError);

    this.isLoading$ = this.store$.select(
      RoleStoreSelectors.selectRoleIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.DELETE_ROLE_SUCCESS)
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Role Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.DELETE_ROLE_FAILURE)
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getRoles() {
    this.store$.dispatch(new RoleStoreActions.LoadRequestAction());
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Role>(this.roles);
    this.dataSource.paginator = this.paginator;
  }

  addRole() {
    this.router.navigate(['roles/add']);
  }

  editRole(id: number) {
    this.router.navigate([`roles/${id}/view`]);
  }

  viewRole(id: number) {
    this.router.navigate([`role/${id}`]);
  }

  get canAddRole() {
    return this.authorizationService.canAdd(ModuleName.ROLES);
  }

  get canDeleteRole() {
    return this.authorizationService.canDelete(ModuleName.ROLES);
  }

  deleteRole(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(new RoleStoreActions.DeleteRoleRequestAction(id));
      }
    );
  }
}
