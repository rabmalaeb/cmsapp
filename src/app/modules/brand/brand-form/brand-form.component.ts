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
import { Brand } from '../brand';
import { FormService } from 'src/app/core/services/form.service';
import { Manufacturer } from '../../manufacturer/manufacturer';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.sass']
})
export class BrandFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) { }

  brandForm: FormGroup;
  @Input() brand: Brand;
  @Input() manufacturers: Manufacturer[];
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditBrand = false;
  @Input() actionError: boolean;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Brand>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    console.log('manufacturers', this.manufacturers);

  }

  ngOnChanges() {
    if (this.isLoadingAction || this.actionError) {
      return false;
    }
    if (this.brand) {
      this.buildExistingBrandForm();
    } else {
      this.buildNewBrandForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewBrandForm() {
    this.brandForm = this.form.group({
      name: ['', [Validators.required]],
      manufacturerId: ['', [Validators.required]]
    });
  }

  buildExistingBrandForm() {
    this.brandForm = this.form.group({
      id: [this.brand.id],
      name: [this.brand.name, [Validators.required]],
      manufacturerId: [this.brand.manufacturerId, [Validators.required]]
    });
  }

  get name() {
    return this.brandForm.get('name');
  }

  get manufacturerId() {
    return this.brandForm.get('manufacturerId');
  }

  buildBrandParams(): Brand {
    return {
      id: this.brandForm.get('id') ? this.brandForm.get('id').value : '',
      name: this.name.value,
      manufacturerId: this.manufacturerId.value
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
    if (!this.formService.isFormValid(this.brandForm)) {
      return false;
    }
    this.submitForm.emit(this.buildBrandParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.brand && this.isLoading;
  }
}
