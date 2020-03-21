import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { LanguageKey, LanguageKeyRequest } from '../language-key';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModuleName } from 'src/app/shared/models/general';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { LanguagekeyStoreSelectors, LanguagekeyStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { filter } from 'rxjs/operators';
import { FilterHandler } from 'src/app/shared/filters/filter';

@Component({
  selector: 'app-languagekeys',
  templateUrl: './language-keys.component.html',
  styleUrls: ['./language-keys.component.scss']
})
export class LanguageKeysComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  languageKeys$: Observable<LanguageKey[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
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

    this.isLoading$ = this.store$.select(
      LanguagekeyStoreSelectors.selectLanguagekeyIsLoading
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.DELETE_LANGUAGEKEY_SUCCESS
        )
      )
      .subscribe(() => {
        this.notificationService.showSuccess(
          'LanguageKey Deleted Successfully'
        );
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.DELETE_LANGUAGEKEY_FAILURE
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
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.store$.dispatch(
          new LanguagekeyStoreActions.DeleteLanguageKeyRequestAction(id)
        );
      }
    );
  }

  get canAddKey() {
    return this.authorizationService.canAdd(ModuleName.LANGUAGE_KEYS);
  }

  get canDeleteKey() {
    return this.authorizationService.canDelete(ModuleName.LANGUAGE_KEYS);
  }
}
