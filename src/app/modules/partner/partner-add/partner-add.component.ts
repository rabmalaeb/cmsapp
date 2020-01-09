import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, USER_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Partner } from '../partner';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PartnerService } from '../partner.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';

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
    private route: ActivatedRoute
  ) {}

  partnerForm: FormGroup;
  actionType: ActionType;
  partner: Partner;
  isLoadingPartner = false;
  isLoading = false;
  categories: Category[] = [];

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.getPartner(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getPartner(id: number) {
    this.isLoadingPartner = true;
    this.partnerService.getPartner(id).subscribe(response => {
      this.isLoadingPartner = false;
      this.partner = response;
      this.buildForm();
    }, error => {
      this.isLoading = false;
      this.errorHandler.handleErrorResponse(error);
    });
  }

  buildForm() {
    let name = '';
    let code = '';
    if (this.partner) {
      name = this.partner.name;
      code = this.partner.code;
    }
    this.partnerForm = this.form.group({
      name: [name, [Validators.required]],
      code: [code, [Validators.required]],
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
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
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

  addPartner(params) {
    this.isLoading = true;
    this.partnerService
      .addPartner(params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Partner added successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  updatePartner(params) {
    this.isLoading = true;
    const id = this.partner.id;
    this.partnerService
      .updatePartner(id, params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Partner updated successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  get buttonLabel() {
    if (this.isLoading) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
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
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.PARTNERS);
  }
}
