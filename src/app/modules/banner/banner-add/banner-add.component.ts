import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType, ModuleName } from 'src/app/shared/models/general';
import { ActivatedRoute } from '@angular/router';
import { Banner } from '../banner';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { BannerStoreSelectors, BannerStoreActions } from '../store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import {
  LanguageStoreSelectors,
  LanguageStoreActions
} from '../../language/store';
import { Language, LanguageRequest } from '../../language/language';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.scss']
})
export class BannerAddComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  actionType: ActionType;
  banner$: Observable<Banner>;
  languages$: Observable<Language[]>;
  isLoading$: Observable<boolean>;
  isLoadingCategories$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.getLanguages();
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getBanner(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      BannerStoreSelectors.selectBannerActionError
    );

    this.isLoadingAction$ = this.store$.select(
      BannerStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PRODUCT_SUCCESS ||
            action.type === ActionTypes.ADD_PRODUCT_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Banner Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Banner Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PRODUCT_FAILURE ||
            action.type === ActionTypes.ADD_PRODUCT_FAILURE
        )
      )
      .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
      });
  }

  getBanner(id: number) {
    this.store$.dispatch(new BannerStoreActions.GetBannerRequestAction(id));
    this.banner$ = this.store$.select(
      BannerStoreSelectors.selectBannerById(id)
    );
    this.isLoading$ = this.store$.select(
      BannerStoreSelectors.selectIsLoadingItem
    );
    this.loadingErrors$ = this.store$.select(
      BannerStoreSelectors.selectBannerLoadingError
    );
  }

  getLanguages(languageRequest: LanguageRequest = null) {
    this.store$.dispatch(
      new LanguageStoreActions.LoadRequestAction(languageRequest)
    );
    this.languages$ = this.store$.select(
      LanguageStoreSelectors.selectAllLanguageItems
    );
    this.isLoadingCategories$ = this.store$.select(
      LanguageStoreSelectors.selectIsLoadingItem
    );
  }

  performAction(banner: Banner) {
    if (this.actionType === ActionType.EDIT) {
      this.updateBanner(banner);
    } else {
      this.addBanner(banner);
    }
  }

  addBanner(banner: Banner) {
    this.store$.dispatch(new BannerStoreActions.AddBannerRequestAction(banner));
  }

  updateBanner(banner: Banner) {
    const id = banner.id;
    this.store$.dispatch(
      new BannerStoreActions.UpdateBannerRequestAction(id, banner)
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Banner';
    }
    return 'Add Banner';
  }

  get canEditBanner$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.PRODUCTS)
    );
  }
}
