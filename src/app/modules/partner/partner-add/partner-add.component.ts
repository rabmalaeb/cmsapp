import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PartnerService } from '../partner.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';
import { PartnerStoreSelectors, PartnerStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Partner } from '../partner';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private partnerService: PartnerService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  partnerForm: FormGroup;
  actionType: ActionType;
  partner: Partner;
  isLoadingPartner = false;
  isLoading = false;
  partner$: Observable<Partner>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<String[]>;
  actionErrors$: Observable<String[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getPartner(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewPartnerForm();
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
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_PARTNER_FAILURE ||
            action.type === ActionTypes.ADD_PARTNER_FAILURE
        )
      )
      .subscribe(() => {
        this.notificationService.showError(
          'An Error has Occurred. Please try again'
        );
      });
  }

  getPartner(id: number) {
    this.store$.dispatch(new PartnerStoreActions.GetPartnerRequestAction(id));
    this.partner$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerById(id)
    );
    this.loadingErrors$ = this.store$.select(
      PartnerStoreSelectors.selectPartnerLoadingError
    );
    this.buildExistingPartnerForm();
  }

  buildNewPartnerForm() {
    this.partnerForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  buildExistingPartnerForm() {
    this.partner$.subscribe(partner => {
      this.partner = partner;
      this.partnerForm = this.form.group({
        name: [partner.name, [Validators.required]],
        code: [partner.code, [Validators.required]]
      });
    });
  }

  get name() {
    return this.partnerForm.get('name');
  }

  get code() {
    return this.partnerForm.get('code');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.partnerForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.partner) {
      this.updatePartner(this.buildPartnerParams());
    } else {
      this.addPartner(this.buildPartnerParams());
    }
  }

  buildPartnerParams(): Partner {
    const partner = new Partner();
    partner.name = this.name.value;
    partner.code = this.code.value;
    return partner;
  }

  addPartner(params: Partner) {
    this.store$.dispatch(
      new PartnerStoreActions.AddPartnerRequestAction(params)
    );
  }

  updatePartner(params: Partner) {
    const id = this.partner.id;
    this.store$.dispatch(
      new PartnerStoreActions.UpdatePartnerRequestAction(id, params)
    );
  }

  get buttonLabel() {
    return this.isLoadingAction$.pipe(
      map(isLoading => {
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

  get canEditPartner() {
    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.PARTNERS)
    );
  }
}
