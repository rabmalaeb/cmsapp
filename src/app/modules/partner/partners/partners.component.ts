import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Partner } from '../partner';
import { ModuleName } from 'src/app/shared/models/nav';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable, Subscription } from 'rxjs';
import { PartnerStoreSelectors, PartnerStoreActions } from '../store';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'code', 'action'];
  dataSource: MatTableDataSource<any>;
  partners$: Observable<Partner[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  filterHandler = new FilterHandler();
  subscriptions: Subscription[] = [];
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
    this.getPartners();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.partners$ = this.store$.select(
      PartnerStoreSelectors.selectAllPartnerItems
    );

    this.error$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      PartnerStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerIsLoading
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_PARTNER_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(SuccessMessages.PARTNER_DELETED);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_PARTNER_FAILURE
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

  getPartners() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new PartnerStoreActions.LoadRequestAction(request));
  }

  addPartner() {
    this.router.navigate(['partners/add']);
  }

  editPartner(id: number) {
    this.router.navigate([`partners/${id}/view`]);
  }

  viewPartner(id: number) {
    this.router.navigate([`partner/${id}`]);
  }

  deletePartner(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new PartnerStoreActions.DeletePartnerRequestAction(id)
      );
    });
  }

  get canAddPartner() {
    return this.authorizationService.canAdd(ModuleName.PARTNERS);
  }

  get canDeletePartner() {
    return this.authorizationService.canDelete(ModuleName.PARTNERS);
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getPartners();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getPartners();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
