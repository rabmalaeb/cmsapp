import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { Manufacturer } from '../manufacturer';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of, Subscription } from 'rxjs';
import { ManufacturerStoreSelectors, ManufacturerStoreActions } from '../store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import {
  CountryStoreActions,
  CountryStoreSelectors,
} from '../../country/store';
import { Country } from '../../country/country';

@Component({
  selector: 'app-manufacturer-add',
  templateUrl: './manufacturer-add.component.html',
  styleUrls: ['./manufacturer-add.component.scss'],
})
export class ManufacturerAddComponent implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  actionType: ActionType;
  manufacturer$: Observable<Manufacturer>;
  countries$: Observable<Country[]>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.initializeStoreVariables();
    this.getCountries();
    this.route.params.forEach((param) => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getManufacturer(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      ManufacturerStoreSelectors.selectManufacturerActionError
    );

    this.isLoadingAction$ = this.store$.select(
      ManufacturerStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      ManufacturerStoreSelectors.selectIsLoadingItem
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_MANUFACTURER_SUCCESS ||
              action.type === ActionTypes.ADD_MANUFACTURER_SUCCESS
          )
        )
        .subscribe(() => {
          let message = 'Manufacturer Updated Successfully';
          if (this.actionType === ActionType.ADD) {
            message = 'Manufacturer Added Successfully';
          }
          this.notificationService.showSuccess(message);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_MANUFACTURER_FAILURE ||
              action.type === ActionTypes.ADD_MANUFACTURER_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getCountries() {
    this.store$.dispatch(new CountryStoreActions.LoadRequestAction());
    this.countries$ = this.store$.select(
      CountryStoreSelectors.selectAllCountryItems
    );
  }

  getManufacturer(id: number) {
    this.store$.dispatch(
      new ManufacturerStoreActions.GetManufacturerRequestAction(id)
    );
    this.manufacturer$ = this.store$.select(
      ManufacturerStoreSelectors.selectManufacturerById(id)
    );
    this.loadingErrors$ = this.store$.select(
      ManufacturerStoreSelectors.selectManufacturerLoadingError
    );
  }

  performAction(manufacturer: Manufacturer) {
    if (this.actionType === ActionType.EDIT) {
      this.updateManufacturer(manufacturer);
    } else {
      this.addManufacturer(manufacturer);
    }
  }

  addManufacturer(manufacturer: Manufacturer) {
    this.store$.dispatch(
      new ManufacturerStoreActions.AddManufacturerRequestAction(manufacturer)
    );
  }

  updateManufacturer(manufacturer: Manufacturer) {
    const id = manufacturer.id;
    this.store$.dispatch(
      new ManufacturerStoreActions.UpdateManufacturerRequestAction(
        id,
        manufacturer
      )
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Manufacturer';
    }
    return 'Add Manufacturer';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditManufacturer$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.MANUFACTURERS)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
