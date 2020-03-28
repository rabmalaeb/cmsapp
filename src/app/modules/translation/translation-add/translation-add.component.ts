import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../translation';
import { LanguageKey } from '../../language-key/language-key';
import { Language } from '../../language/language';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  RootStoreState,
} from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { TranslationStoreSelectors, TranslationStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter } from 'rxjs/operators';
import {
  LanguageStoreActions,
  LanguageStoreSelectors
} from '../../language/store';
import {
  LanguagekeyStoreActions,
  LanguagekeyStoreSelectors
} from '../../language-key/store';

@Component({
  selector: 'app-translation-add',
  templateUrl: './translation-add.component.html',
  styleUrls: ['./translation-add.component.scss']
})
export class TranslationAddComponent implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>
  ) {}

  actionType: ActionType;
  translation: Translation;
  isLoadingTranslation$: Observable<boolean>;
  isLoadingLanguages$: Observable<boolean>;
  isLoadingLanguageKeys$: Observable<boolean>;
  languages$: Observable<Language[]>;
  languageKeys$: Observable<LanguageKey[]>;
  translation$: Observable<Translation>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.getLanguageKeys();
    this.getLanguages();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getTranslation(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationActionError
    );

    this.isLoadingAction$ = this.store$.select(
      TranslationStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      TranslationStoreSelectors.selectIsLoadingItem
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_TRANSLATION_SUCCESS ||
            action.type === ActionTypes.ADD_TRANSLATION_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Translation Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Translation Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_TRANSLATION_FAILURE ||
            action.type === ActionTypes.ADD_TRANSLATION_FAILURE
        )
      )
       .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getTranslation(id: number) {
    this.store$.dispatch(
      new TranslationStoreActions.GetTranslationRequestAction(id)
    );
    this.translation$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationById(id)
    );
    this.isLoading$ = this.store$.select(
      TranslationStoreSelectors.selectIsLoadingItem
    );
    this.loadingErrors$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationLoadingError
    );
  }

  getLanguages() {
    this.store$.dispatch(new LanguageStoreActions.LoadRequestAction());
    this.languages$ = this.store$.select(
      LanguageStoreSelectors.selectAllLanguageItems
    );
    this.isLoadingLanguages$ = this.store$.select(
      LanguageStoreSelectors.selectIsLoadingItem
    );
  }

  getLanguageKeys() {
    this.store$.dispatch(new LanguagekeyStoreActions.LoadRequestAction());
    this.languageKeys$ = this.store$.select(
      LanguagekeyStoreSelectors.selectAllLanguagekeyItems
    );
    this.isLoadingLanguageKeys$ = this.store$.select(
      LanguagekeyStoreSelectors.selectIsLoadingItem
    );
  }

  performAction(translation: Translation) {
    if (this.actionType === ActionType.EDIT) {
      this.updateTranslation(translation);
    } else {
      this.addTranslation(translation);
    }
  }

  addTranslation(translation: Translation) {
    this.store$.dispatch(
      new TranslationStoreActions.AddTranslationRequestAction(translation)
    );
  }

  updateTranslation(translation: Translation) {
    const id = translation.id;
    this.store$.dispatch(
      new TranslationStoreActions.UpdateTranslationRequestAction(id, translation)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Translation';
    }
    return 'Add Translation';
  }

  get canEditTranslation$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.TRANSLATIONS)
    );
  }
}
