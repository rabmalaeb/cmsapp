import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Translation } from '../translation';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { TranslationStoreSelectors, TranslationStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RootStoreState } from 'src/app/root-store';
import { Observable, Subscription } from 'rxjs';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';
import { AuthenticationService } from '../../authentication/authentication.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent extends BaseListComponent implements OnInit, OnDestroy {
  private columns: string[] = [
    'id',
    'language',
    'partner',
    'key',
    'value',
    'action',
  ];
  displayedColumns = [];
  translations$: Observable<Translation[]>;
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
    private authenticationService: AuthenticationService,
    private actionsSubject$: ActionsSubject
  ) {
    super();
    this.fetchListAction = this.getTranslations;
  }

  ngOnInit() {
    this.getTranslations();
    this.fillDisplayedColumns();
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

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.DELETE_TRANSLATION_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(
            SuccessMessages.TRANSLATION_DELETED
          );
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.DELETE_TRANSLATION_FAILURE
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
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new TranslationStoreActions.DeleteTranslationRequestAction(id)
      );
    });
  }

  get canAddTranslation() {
    return this.authorizationService.canAdd(ModuleName.TRANSLATIONS);
  }

  get canDeleteTranslation() {
    return this.authorizationService.canDelete(ModuleName.TRANSLATIONS);
  }

  fillDisplayedColumns() {
    this.columns.forEach((column) => {
      if (
        !this.authenticationService.isTopLevelPartner &&
        column === 'partner'
      ) {
      } else {
        this.displayedColumns.push(column);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
