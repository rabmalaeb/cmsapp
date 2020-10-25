import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Language, LanguageRequest } from '../language';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/nav';
import { Observable } from 'rxjs';
import { LanguageStoreActions, LanguageStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { SuccessMessages, ConfirmMessages } from 'src/app/shared/models/messages';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent extends BaseListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'action'];
  languages$: Observable<Language[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  totalNumberOfItems$: Observable<number>;
  dataSource: MatTableDataSource<any>;

  constructor(
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject
  ) {

    super();
    this.fetchListAction = this.getLanguages;
  }

  ngOnInit() {
    super.ngOnInit();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.languages$ = this.store$.select(
      LanguageStoreSelectors.selectAllLanguageItems
    );

    this.error$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageLoadingError
    );

    this.totalNumberOfItems$ = this.store$.select(
      LanguageStoreSelectors.selectTotalNumberOfItems
    );

    this.isLoading$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageIsLoading
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

  getLanguages() {
    const request = this.filterHandler.getRequest();
    this.store$.dispatch(new LanguageStoreActions.LoadRequestAction(request));
  }

  addLanguage() {
    this.router.navigate(['languages/add']);
  }

  editLanguage(id: number) {
    this.router.navigate([`languages/${id}/view`]);
  }

  viewLanguage(id: number) {
    this.router.navigate([`language/${id}`]);
  }

  deleteLanguage(id: number) {
    this.alertService.confirmDelete(ConfirmMessages.CONFIRM_DELETE, () => {
      this.store$.dispatch(
        new LanguageStoreActions.DeleteLanguageRequestAction(id)
      );
    });
  }

  get canAddLanguage() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGES);
  }

  get canDeleteLanguage() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGES);
  }
}
