import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ALERT_MESSAGES } from 'src/app/shared/models/alert';
import { Partner } from '../partner';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.sass']
})
export class PartnerFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  partnerForm: FormGroup;
  @Input() partner: Partner;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditPartner = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Partner>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    if (this.partner) {
      this.buildExistingPartnerForm();
    } else {
      this.buildNewPartnerForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewPartnerForm() {
    this.partnerForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  buildExistingPartnerForm() {
    this.partnerForm = this.form.group({
      id: [this.partner.id],
      name: [this.partner.name, [Validators.required]],
      code: [this.partner.code, [Validators.required]]
    });
  }

  get name() {
    return this.partnerForm.get('name');
  }

  get code() {
    return this.partnerForm.get('code');
  }

  buildPartnerParams(): Partner {
    return {
      id: this.partnerForm.get('id') ? this.partnerForm.get('id').value : '',
      name: this.name.value,
      code: this.code.value
    };
  }

  get buttonLabel() {
    if (this.isLoadingAction) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.partnerForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    this.submitForm.emit(this.buildPartnerParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.partner && this.isLoading;
  }
}
