import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Supplier, SupplierRequest } from '../supplier';
import { ModuleName } from 'src/app/shared/models/general';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable } from 'rxjs';
import { SupplierStoreSelectors, SupplierStoreActions } from '../store';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'action'];
  dataSource: MatTableDataSource<any>;
  suppliers$: Observable<Supplier[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  filterHandler = new FilterHandler();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    this.getSuppliers();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.suppliers$ = this.store$.select(
      SupplierStoreSelectors.selectAllSupplierItems
    );

    this.error$ = this.store$.select(
      SupplierStoreSelectors.selectSupplierLoadingError
    );

    this.isLoading$ = this.store$.select(
      SupplierStoreSelectors.selectSupplierIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_SUPPLIER_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Supplier Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_SUPPLIER_FAILURE
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

  getSuppliers() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(
      new SupplierStoreActions.LoadRequestAction(request)
    );
  }


  addSupplier() {
    this.router.navigate(['suppliers/add']);
  }

  editSupplier(id: number) {
    this.router.navigate([`suppliers/${id}/view`]);
  }

  viewSupplier(id: number) {
    this.router.navigate([`supplier/${id}`]);
  }

  deleteSupplier(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new SupplierStoreActions.DeleteSupplierRequestAction(id)
        );
      }
    );
  }

  get canAddSupplier() {
    return this.authorizationService.canAdd(ModuleName.SUPPLIERS);
  }

  get canDeleteSupplier() {
    return this.authorizationService.canDelete(ModuleName.SUPPLIERS);
  }
}
