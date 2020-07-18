import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Brand, BrandRequest } from '../brand';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable } from 'rxjs';
import { BrandStoreActions, BrandStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';
import { SuccessMessages, ConfirmMessages } from 'src/app/shared/models/messages';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'manufacturer', 'action'];
  brands$: Observable<Brand[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  filterHandler = new FilterHandler();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    this.getBrands();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.brands$ = this.store$.select(
      BrandStoreSelectors.selectAllBrandItems
    );

    this.error$ = this.store$.select(
      BrandStoreSelectors.selectBrandLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      BrandStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      BrandStoreSelectors.selectBrandIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_LANGUAGE_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess(SuccessMessages.LANGUAGE_DELETED);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_LANGUAGE_FAILURE
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

  getBrands() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new BrandStoreActions.LoadRequestAction(request));
  }

  addBrand() {
    this.router.navigate(['brands/add']);
  }

  editBrand(id: number) {
    this.router.navigate([`brands/${id}/view`]);
  }

  viewBrand(id: number) {
    this.router.navigate([`brand/${id}`]);
  }

  deleteBrand(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new BrandStoreActions.DeleteBrandRequestAction(id)
      );
    });
  }

  get canAddBrand() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGES);
  }

  get canDeleteBrand() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGES);
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getBrands();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getBrands();
  }
}
