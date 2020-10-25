import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { LanguageKey } from '../language-key';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { LanguagekeyStoreSelectors, LanguagekeyStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { filter } from 'rxjs/operators';
import {
  SuccessMessages,
  ConfirmMessages,
} from 'src/app/shared/models/messages';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';

@Component({
  selector: 'app-languagekeys',
  templateUrl: './language-keys.component.html',
  styleUrls: ['./language-keys.component.scss'],
})
export class LanguageKeysComponent extends BaseListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  languageKeys$: Observable<LanguageKey[]>;
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
    this.fetchListAction = this.getLanguageKeys;
  }

  ngOnInit() {
    this.getLanguageKeys();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.languageKeys$ = this.store$.select(
      LanguagekeyStoreSelectors.selectAllLanguagekeyItems
    );

    this.error$ = this.store$.select(
      LanguagekeyStoreSelectors.selectLanguagekeyLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      LanguagekeyStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      LanguagekeyStoreSelectors.selectLanguagekeyIsLoading
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.DELETE_LANGUAGEKEY_SUCCESS
          )
        )
        .subscribe(() => {
          this.notificationService.showSuccess(
            SuccessMessages.LANGUAGE_KEY_DELETED
          );
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.DELETE_LANGUAGEKEY_FAILURE
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

  getLanguageKeys() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(
      new LanguagekeyStoreActions.LoadRequestAction(request)
    );
  }

  addLanguageKey() {
    this.router.navigate(['keys/add']);
  }

  editLanguageKey(id: number) {
    this.router.navigate([`keys/${id}/view`]);
  }

  viewLanguageKey(id: number) {
    this.router.navigate([`key/${id}`]);
  }

  deleteLanguageKey(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new LanguagekeyStoreActions.DeleteLanguageKeyRequestAction(id)
      );
    });
  }

  get canAddKey() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGE_KEYS);
  }

  get canDeleteKey() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGE_KEYS);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
