import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Permission, PermissionRequest } from '../permission';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PermissionStoreSelectors, PermissionStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  permissions$: Observable<Permission[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  filterHandler = new FilterHandler();
  displayedColumns: string[] = ['id', 'name', 'type', 'group', 'action'];
  dataSource: MatTableDataSource<any>;
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
    this.getPermissions();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.permissions$ = this.store$.select(
      PermissionStoreSelectors.selectAllPermissionItems
    );

    this.error$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      PermissionStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PERMISSION_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Permission Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PERMISSION_FAILURE
        )
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

  getPermissions() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new PermissionStoreActions.LoadRequestAction(request));
  }

  addPermission() {
    this.router.navigate(['permissions/add']);
  }

  editPermission(id: number) {
    this.router.navigate([`permissions/${id}/view`]);
  }

  viewPermission(id: number) {
    this.router.navigate([`permission/${id}`]);
  }

  deletePermission(id: number) {
    this.alertService.confirmDelete('Are you sure you want to delete? ', () => {
      this.store$.dispatch(
        new PermissionStoreActions.DeletePermissionRequestAction(id)
      );
    });
  }

  get canAddPermission() {
    return this.authorizationService.canAdd(ModuleName.PERMISSIONS);
  }

  get canDeletePermission() {
    return this.authorizationService.canDelete(ModuleName.PERMISSIONS);
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getPermissions();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getPermissions();
  }
}
