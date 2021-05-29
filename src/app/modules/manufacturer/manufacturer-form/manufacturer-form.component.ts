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
import { Country } from '../../country/country';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import { Labels } from 'src/app/shared/models/input';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.sass'],
})
export class ManufacturerFormComponent
  extends BaseFormComponent
  implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {
    super();
  }

  manufacturerForm: FormGroup;
  @Input() manufacturer: Manufacturer;
  @Input() countries: Country[];
  @Input() canEditManufacturer = false;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || (this.actionError && this.manufacturerForm)) {
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
    this.manufacturerForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
    });
  }

  buildExistingManufacturerForm() {
    this.manufacturerForm = this.form.group({
      id: [this.manufacturer.id],
      name: [this.manufacturer.name, [Validators.required]],
      code: [this.manufacturer.code, [Validators.required]],
      countryId: [this.manufacturer.countryId, [Validators.required]],
    });
  }

  get name() {
    return this.manufacturerForm.get('name');
  }

  get code() {
    return this.manufacturerForm.get('code');
  }

  get countryId() {
    return this.manufacturerForm.get('countryId');
  }

  buildManufacturerParams(): Manufacturer {
    return {
      id: this.manufacturerForm.get('id')
        ? this.manufacturerForm.get('id').value
        : '',
      name: this.name.value,
      code: this.code.value,
      countryId: this.countryId.value,
    };
  }

  get buttonLabel() {
    if (this.isLoadingAction) {
      return Labels.LOADING;
    }
    if (this.actionType === ActionType.EDIT) {
      return Labels.UPDATE;
    }
    return Labels.ADD;
  }

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.formService.isFormValid(this.manufacturerForm)) {
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
