import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../admin';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { AlertService } from 'src/app/core/services/alert.service';
import { Observable, Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { AdminStoreSelectors, AdminStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { filter } from 'rxjs/operators';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent
  extends BaseListComponent
  implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'email', 'active', 'action'];
  dataSource: MatTableDataSource<any>;
  admins$: Observable<Admin[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  subscriptions: Subscription[] = [];
  constructor(
    private alertService: AlertService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private notificationService: NotificationService,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject
  ) {
    super();
    this.fetchListAction = this.getAdmins;
  }

  ngOnInit() {
    this.getAdmins();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.admins$ = this.store$.select(AdminStoreSelectors.selectAllAdminItems);

    this.error$ = this.store$.select(
      AdminStoreSelectors.selectAdminLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      AdminStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      AdminStoreSelectors.selectAdminIsLoading
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_ADMIN_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(SuccessMessages.ADMIN_DELETED);
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_ADMIN_FAILURE
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

  getAdmins() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new AdminStoreActions.LoadRequestAction(request));
  }

  addAdmin() {
    this.router.navigate(['admins/add']);
  }

  editAdmin(id: number) {
    this.router.navigate([`admins/${id}/view`]);
  }

  viewAdmin(id: number) {
    this.router.navigate([`admin/${id}`]);
  }

  deleteAdmin(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(new AdminStoreActions.DeleteAdminRequestAction(id));
    });
  }

  get canAddAdmin(): Observable<boolean> {
    return this.authorizationService.canAdd(ModuleName.ADMINS);
  }

  get canDeleteAdmin(): Observable<boolean> {
    return this.authorizationService.canDelete(ModuleName.ADMINS);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
