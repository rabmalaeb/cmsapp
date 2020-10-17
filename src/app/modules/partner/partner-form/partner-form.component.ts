import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { ActionType } from 'src/app/shared/models/general';
import { Partner, PartnerRequest } from '../partner';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.sass'],
})
export class PartnerFormComponent implements OnInit, OnChanges {
  partnerForm: FormGroup;
  @Input() partner: Partner;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditPartner = false;
  @Input() isLoading: boolean;
  @Input() actionError: boolean;
  @Output() submitForm = new EventEmitter<PartnerRequest>();
  formGroupDirective: FormGroupDirective;
  partnerImage: File;
  resetImage = false;

  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || (this.actionError && this.partnerForm)) {
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
      code: ['', [Validators.required]],
      partnerName: ['', [Validators.required]],
      copyright: ['', [Validators.required]],
      websiteUrl: ['', [Validators.required]],
      supportEmail: ['', [Validators.required]],
    });
  }

  buildExistingPartnerForm() {
    this.partnerForm = this.form.group({
      id: [this.partner.id],
      name: [this.partner.name, [Validators.required]],
      code: [this.partner.code, [Validators.required]],
      partnerName: [
        this.partner.emailWhiteLabel
          ? this.partner.emailWhiteLabel.partnerName
          : '',
        [Validators.required],
      ],
      copyright: [
        this.partner.emailWhiteLabel
          ? this.partner.emailWhiteLabel.copyright
          : '',
        [Validators.required],
      ],
      websiteUrl: [
        this.partner.emailWhiteLabel
          ? this.partner.emailWhiteLabel.websiteUrl
          : '',
        [Validators.required],
      ],
      supportEmail: [
        this.partner.emailWhiteLabel
          ? this.partner.emailWhiteLabel.supportEmail
          : '',
        [Validators.required],
      ],
    });
  }

  get name() {
    return this.partnerForm.get('name');
  }

  get supportEmail() {
    return this.partnerForm.get('supportEmail');
  }

  get code() {
    return this.partnerForm.get('code');
  }

  get partnerName() {
    return this.partnerForm.get('partnerName');
  }

  get copyright() {
    return this.partnerForm.get('copyright');
  }

  get websiteUrl() {
    return this.partnerForm.get('websiteUrl');
  }

  buildPartnerParams(): PartnerRequest {
    return {
      id: this.partnerForm.get('id') ? this.partnerForm.get('id').value : '',
      name: this.name.value,
      code: this.code.value,
      partnerName: this.partnerName.value,
      copyright: this.copyright.value,
      websiteUrl: this.websiteUrl.value,
      supportEmail: this.supportEmail.value,
      image: this.partnerImage ? this.partnerImage : null,
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
    if (!this.formService.isFormValid(this.partnerForm)) {
      return false;
    }
    this.submitForm.emit(this.buildPartnerParams());
  }

  uploadImage(image: File) {
    this.partnerImage = image;
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.partner && this.isLoading;
  }
}
