import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { User } from '../user';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable, Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  RootStoreState,
  UserStoreSelectors,
  UserStoreActions,
} from 'src/app/root-store';
import { ActionTypes } from '../store/actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  filterHandler = new FilterHandler();

  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'mobile',
    'action',
  ];
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
    this.getUsers();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.users$ = this.store$.select(UserStoreSelectors.selectAllUserItems);

    this.error$ = this.store$.select(UserStoreSelectors.selectUserLoadingError);

    this.isLoading$ = this.store$.select(
      UserStoreSelectors.selectUserIsLoading
    );

    this.totalNumberOfItems$ = this.store$.select(
      UserStoreSelectors.selectTotalNumberOfItems
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_USER_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(SuccessMessages.USER_DELETED);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_USER_FAILURE
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

  getUsers() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new UserStoreActions.LoadRequestAction(request));
  }

  addUser() {
    this.router.navigate(['users/add']);
  }

  editUser(id: number) {
    this.router.navigate([`users/${id}/view`]);
  }

  viewUser(id: number) {
    this.router.navigate([`user/${id}`]);
  }

  get canAddUser() {
    return this.authorizationService.canAdd(ModuleName.USERS);
  }

  get canDeleteUser() {
    return this.authorizationService.canDelete(ModuleName.USERS);
  }

  deleteUser(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(new UserStoreActions.DeleteUserRequestAction(id));
    });
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getUsers();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
