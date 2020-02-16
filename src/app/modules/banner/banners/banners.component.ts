import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { Banner } from '../banner';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';
import { filter } from 'rxjs/operators';
import { BannerStoreActions, BannerStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { NotificationService } from 'src/app/services/notification.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  isLoading = false;
  banners: Banner[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  banners$: Observable<Banner[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
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

    this.isLoading$ = this.store$.select(
      BannerStoreSelectors.selectBannerIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PRODUCT_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Banner Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_PRODUCT_FAILURE
        )
      )
      .subscribe(() => {
        this.notificationService.showError(
          'Could not delete Banner. Please try again'
        );
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
       .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getBanners() {
    this.store$.dispatch(new BannerStoreActions.LoadRequestAction());
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Banner>(this.banners);
    this.dataSource.paginator = this.paginator;
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
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new BannerStoreActions.DeleteBannerRequestAction(id)
        );
      }
    );
  }

  get canAddBanner() {
    return this.authorizationService.canAdd(ModuleName.PRODUCTS);
  }

  get canDeleteBanner() {
    return this.authorizationService.canDelete(ModuleName.PRODUCTS);
  }
}
