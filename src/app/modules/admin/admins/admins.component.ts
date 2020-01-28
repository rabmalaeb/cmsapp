import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';
import { AlertService } from 'src/app/services/alert.service';
import { Observable } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { AdminStoreSelectors, AdminStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { NotificationService } from 'src/app/services/notification.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  isLoading = false;
  admins: Admin[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'email',
    'active',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  admins$: Observable<Admin[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject,
  ) { }

  ngOnInit() {
    this.getAdmins();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.admins$ = this.store$.select(AdminStoreSelectors.selectAllAdminItems);

    this.error$ = this.store$.select(AdminStoreSelectors.selectAdminLoadingError);

    this.isLoading$ = this.store$.select(
      AdminStoreSelectors.selectAdminIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.DELETE_ADMIN_SUCCESS)
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Admin Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.DELETE_ADMIN_FAILURE)
      )
      .subscribe(() => {
        this.notificationService.showError('Could not delete Admin. Please try again');
      });

    this.actionsSubject$
      .pipe(
        filter((action: any) => action.type === ActionTypes.LOAD_FAILURE)
      )
      .subscribe(() => {
        this.notificationService.showError('An Error has occurred. Please try again');
      });
  }

  getAdmins() {
    this.store$.dispatch(new AdminStoreActions.LoadRequestAction());
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Admin>(this.admins);
    this.dataSource.paginator = this.paginator;
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
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.adminService.deleteAdmin(id).subscribe(response => {
          this.admins = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddAdmin(): Observable<boolean> {
    return this.authorizationService.canAdd(ModuleName.ADMINS);
  }

  get canDeleteAdmin(): Observable<boolean> {
    return this.authorizationService.canDelete(ModuleName.ADMINS);
  }
}
