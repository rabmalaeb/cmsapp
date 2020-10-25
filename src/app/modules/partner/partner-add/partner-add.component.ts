import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Observable, of, Subscription } from 'rxjs';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';
import { PartnerStoreSelectors, PartnerStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Partner, PartnerRequest } from '../partner';
import { BaseActionComponent } from 'src/app/shared/base/base-action/base-action.component';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss'],
})
export class PartnerAddComponent
  extends BaseActionComponent
  implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {
    super();
  }

  actionType: ActionType;
  partner$: Observable<Partner>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach((param) => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getPartner(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerActionError
    );

    this.isLoadingAction$ = this.store$.select(
      PartnerStoreSelectors.selectIsLoadingAction
    );

    this.isLoading$ = this.store$.select(
      PartnerStoreSelectors.selectIsLoadingItem
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_PARTNER_SUCCESS ||
              action.type === ActionTypes.ADD_PARTNER_SUCCESS
          )
        )
        .subscribe(() => {
          let message = 'Partner Updated Successfully';
          if (this.actionType === ActionType.ADD) {
            message = 'Partner Added Successfully';
          }
          this.notificationService.showSuccess(message);
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_PARTNER_FAILURE ||
              action.type === ActionTypes.ADD_PARTNER_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getPartner(id: number) {
    this.store$.dispatch(new PartnerStoreActions.GetPartnerRequestAction(id));
    this.partner$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerById(id)
    );
    this.loadingErrors$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerLoadingError
    );
  }

  performAction(partner: PartnerRequest) {
    if (this.actionType === ActionType.EDIT) {
      this.updatePartner(partner);
    } else {
      this.addPartner(partner);
    }
  }

  addPartner(params: PartnerRequest) {
    this.store$.dispatch(
      new PartnerStoreActions.AddPartnerRequestAction(params)
    );
  }

  updatePartner(params: PartnerRequest) {
    const id = params.id;
    this.store$.dispatch(
      new PartnerStoreActions.UpdatePartnerRequestAction(id, params)
    );
  }

  get buttonLabel() {
    return this.isLoadingAction$.pipe(
      map((isLoading) => {
        if (isLoading) {
          return 'Loading';
        }
        if (this.actionType === ActionType.EDIT) {
          return 'Update';
        }
        return 'Add';
      })
    );
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Partner';
    }
    return 'Add Partner';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditPartner$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.PARTNERS)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
