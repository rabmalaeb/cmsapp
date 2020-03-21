import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { Language, LanguageRequest } from '../language';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/general';
import { Observable } from 'rxjs';
import { LanguageStoreActions, LanguageStoreSelectors } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { FilterHandler } from 'src/app/shared/filters/filter';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'action'];
  languages$: Observable<Language[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
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
    this.getLanguages();
    this.initializeStoreVariables();
  }

  initializeStoreVariables() {
    this.languages$ = this.store$.select(
      LanguageStoreSelectors.selectAllLanguageItems
    );

    this.error$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageLoadingError
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
        this.notificationService.showSuccess('Language Deleted Successfully');
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
    this.store$.dispatch(
      new LanguageStoreActions.LoadRequestAction(request)
    );
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
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new LanguageStoreActions.DeleteLanguageRequestAction(id)
        );
      }
    );
  }

  get canAddLanguage() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGES);
  }

  get canDeleteLanguage() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGES);
  }
}
