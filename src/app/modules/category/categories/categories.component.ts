import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Category, CategoryRequest } from '../category';
import { ModuleName } from 'src/app/shared/models/nav';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable, Subscription } from 'rxjs';
import { RootStoreState } from 'src/app/root-store';
import { Store, ActionsSubject } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CategoryStoreSelectors, CategoryStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';
import { Sort } from '@angular/material/sort';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'parent', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  categories$: Observable<Category[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
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
    this.getCategories();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.categories$ = this.store$.select(
      CategoryStoreSelectors.selectAllCategoryItems
    );

    this.error$ = this.store$.select(
      CategoryStoreSelectors.selectCategoryLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      CategoryStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      CategoryStoreSelectors.selectCategoryIsLoading
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_CATEGORY_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(
            SuccessMessages.CATEGORY_DELETED
          );
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.DELETE_CATEGORY_FAILURE
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

  getCategories() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new CategoryStoreActions.LoadRequestAction(request));
  }

  addCategory() {
    this.router.navigate(['categories/add']);
  }

  editCategory(id: number) {
    this.router.navigate([`categories/${id}/view`]);
  }

  viewCategory(id: number) {
    this.router.navigate([`category/${id}`]);
  }

  deleteCategory(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new CategoryStoreActions.DeleteCategoryRequestAction(id)
      );
    });
  }

  get canAddCategory() {
    return this.authorizationService.canAdd(ModuleName.CATEGORIES);
  }

  get canDeleteCategory() {
    return this.authorizationService.canDelete(ModuleName.CATEGORIES);
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getCategories();
  }

  sortItems(sort: Sort) {
    this.filterHandler.setSort(sort);
    this.getCategories();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
