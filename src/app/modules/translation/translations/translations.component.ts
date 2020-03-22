import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Translation } from '../translation';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/general';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { TranslationStoreSelectors, TranslationStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { FilterHandler } from 'src/app/shared/filters/filter';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'language',
    'partner',
    'key',
    'value',
    'action'
  ];
  translations$: Observable<Translation[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  dataSource: MatTableDataSource<any>;
  filterHandler = new FilterHandler();
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
    this.getTranslations();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.translations$ = this.store$.select(
      TranslationStoreSelectors.selectAllTranslationItems
    );

    this.error$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      TranslationStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.DELETE_TRANSLATION_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess(
          'Translation Deleted Successfully'
        );
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.DELETE_TRANSLATION_FAILURE
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

  getTranslations() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(
      new TranslationStoreActions.LoadRequestAction(request)
    );
  }

  addTranslation() {
    this.router.navigate(['translations/add']);
  }

  editTranslation(id: number) {
    this.router.navigate([`translations/${id}/view`]);
  }

  viewTranslation(id: number) {
    this.router.navigate([`translation/${id}`]);
  }

  deleteTranslation(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new TranslationStoreActions.DeleteTranslationRequestAction(id)
        );
      }
    );
  }

  get canAddTranslation() {
    return this.authorizationService.canAdd(ModuleName.TRANSLATIONS);
  }

  get canDeleteTranslation() {
    return this.authorizationService.canDelete(ModuleName.TRANSLATIONS);
  }

  get perPage() {
    return this.filterHandler.getPaginator().perPage;
  }

  setPage($event: PageEvent) {
    this.filterHandler.setPaginator($event.pageIndex + 1, $event.pageSize);
    this.getTranslations();
  }
}
