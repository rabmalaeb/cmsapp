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
import { ActionType } from 'src/app/shared/models/general';
import { Manufacturer } from '../manufacturer';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.sass']
})
export class ManufacturerFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) { }

  languageForm: FormGroup;
  @Input() manufacturer: Manufacturer;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditManufacturer = false;
  @Input() actionError: boolean;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Manufacturer>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() { }

  ngOnChanges() {
    if (this.isLoadingAction || this.actionError) {
      return false;
    }
    if (this.manufacturer) {
      this.buildExistingManufacturerForm();
    } else {
      this.buildNewManufacturerForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewManufacturerForm() {
    this.languageForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  buildExistingManufacturerForm() {
    this.languageForm = this.form.group({
      id: [this.manufacturer.id],
      name: [this.manufacturer.name, [Validators.required]],
      code: [this.manufacturer.code, [Validators.required]]
    });
  }

  get name() {
    return this.languageForm.get('name');
  }

  get code() {
    return this.languageForm.get('code');
  }

  buildManufacturerParams(): Manufacturer {
    return {
      id: this.languageForm.get('id') ? this.languageForm.get('id').value : '',
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
    if (!this.formService.isFormValid(this.languageForm)) {
      return false;
    }
    this.submitForm.emit(this.buildManufacturerParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.manufacturer && this.isLoading;
  }
}
