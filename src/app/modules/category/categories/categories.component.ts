import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Category, CategoryRequest } from '../category';
import { ModuleName } from 'src/app/shared/models/general';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable } from 'rxjs';
import { RootStoreState } from 'src/app/root-store';
import { Store, ActionsSubject } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CategoryStoreSelectors, CategoryStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories: Category[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'parent',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  categories$: Observable<Category[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
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

    this.isLoading$ = this.store$.select(
      CategoryStoreSelectors.selectCategoryIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_CATEGORY_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Category Deleted Successfully');
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) => action.type === ActionTypes.DELETE_CATEGORY_FAILURE
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

  getCategories(categories: CategoryRequest = null) {
    this.store$.dispatch(
      new CategoryStoreActions.LoadRequestAction(categories)
    );
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Category>(this.categories);
    this.dataSource.paginator = this.paginator;
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
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new CategoryStoreActions.DeleteCategoryRequestAction(id)
        );
      }
    );
  }

  get canAddCategory() {
    return this.authorizationService.canAdd(ModuleName.CATEGORIES);
  }

  get canDeleteCategory() {
    return this.authorizationService.canDelete(ModuleName.CATEGORIES);
  }
}
