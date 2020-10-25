import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Manufacturer } from '../manufacturer';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable, Subscription } from 'rxjs';
import { ManufacturerStoreActions, ManufacturerStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss'],
})
export class ManufacturersComponent extends BaseListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'country', 'action'];
  manufacturers$: Observable<Manufacturer[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  dataSource: MatTableDataSource<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {
    super();
    this.fetchListAction = this.getManufacturers;
  }

  ngOnInit() {
    this.getManufacturers();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.manufacturers$ = this.store$.select(
      ManufacturerStoreSelectors.selectAllManufacturerItems
    );

    this.error$ = this.store$.select(
      ManufacturerStoreSelectors.selectManufacturerLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      ManufacturerStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      ManufacturerStoreSelectors.selectManufacturerIsLoading
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.DELETE_MANUFACTURER_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(
            SuccessMessages.MANUFACTURER_DELETED
          );
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.DELETE_MANUFACTURER_FAILURE
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

  getManufacturers() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(
      new ManufacturerStoreActions.LoadRequestAction(request)
    );
  }

  addManufacturer() {
    this.router.navigate(['manufacturers/add']);
  }

  editManufacturer(id: number) {
    this.router.navigate([`manufacturers/${id}/view`]);
  }

  viewManufacturer(id: number) {
    this.router.navigate([`manufacturer/${id}`]);
  }

  deleteManufacturer(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new ManufacturerStoreActions.DeleteManufacturerRequestAction(id)
      );
    });
  }

  get canAddManufacturer() {
    return this.authorizationService.canAdd(ModuleName.MANUFACTURERS);
  }

  get canDeleteManufacturer() {
    return this.authorizationService.canDelete(ModuleName.MANUFACTURERS);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
