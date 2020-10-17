import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Banner, BannerRequest } from '../banner';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { filter } from 'rxjs/operators';
import { BannerStoreActions, BannerStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable, Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'image', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  banners$: Observable<Banner[]>;
  totalNumberOfItems$: Observable<number>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  filterHandler = new FilterHandler();
  subscriptions: Subscription[] = [];
  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    this.getBanners();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.banners$ = this.store$.select(
      BannerStoreSelectors.selectAllBannerItems
    );

    this.error$ = this.store$.select(
      BannerStoreSelectors.selectBannerLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      BannerStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      BannerStoreSelectors.selectBannerIsLoading
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_PRODUCT_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(SuccessMessages.BANNER_DELETED);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_PRODUCT_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
      .subscribe((errorResponse) => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getBanners() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new BannerStoreActions.LoadRequestAction(request));
  }

  addBanner() {
    this.router.navigate(['banners/add']);
  }

  editBanner(id: number) {
    this.router.navigate([`banners/${id}/view`]);
  }

  viewBanner(id: number) {
    this.router.navigate([`banner/${id}`]);
  }

  deleteBanner(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new BannerStoreActions.DeleteBannerRequestAction(id)
      );
    });
  }

  get canAddBanner() {
    return this.authorizationService.canAdd(ModuleName.PRODUCTS);
  }

  get canDeleteBanner() {
    return this.authorizationService.canDelete(ModuleName.PRODUCTS);
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getBanners();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getBanners();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
