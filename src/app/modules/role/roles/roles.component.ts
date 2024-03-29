import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Role } from '../role';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable, Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  RootStoreState,
  RoleStoreSelectors,
  RoleStoreActions
} from 'src/app/root-store';
import { ActionTypes } from '../store/actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';
import { SuccessMessages, ConfirmMessages } from 'src/app/shared/models/messages';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
  roles$: Observable<Role[]>;
  error$: Observable<string>;
  totalNumberOfItems$: Observable<number>;
  isLoading$: Observable<boolean>;
  filterHandler = new FilterHandler();
  displayedColumns: string[] = ['id', 'name', 'partner', 'action'];
  dataSource: MatTableDataSource<any>;
  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
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

    this.totalNumberOfItems$ = this.store$.select(
      RoleStoreSelectors.selectTotalNumberOfItems
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_ROLE_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(SuccessMessages.ROLE_DELETED);
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_ROLE_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getRoles() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new RoleStoreActions.LoadRequestAction(request));
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
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(new RoleStoreActions.DeleteRoleRequestAction(id));
    });
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getRoles();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getRoles();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
