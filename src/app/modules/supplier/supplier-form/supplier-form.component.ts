import {
  Component,
  OnInit,
  Input,
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
import { Supplier } from '../supplier';
import { FormService } from 'src/app/core/services/form.service';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.sass'],
})
export class SupplierFormComponent
  extends BaseFormComponent
  implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {
    super();
  }

  supplierForm: FormGroup;
  @Input() supplier: Supplier;
  @Input() canEditSupplier = false;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || (this.actionError && this.submitForm)) {
      return false;
    }
    if (this.supplier) {
      this.buildExistingSupplierForm();
    } else {
      this.buildNewSupplierForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewSupplierForm() {
    this.supplierForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  buildExistingSupplierForm() {
    this.supplierForm = this.form.group({
      id: [this.supplier.id],
      name: [this.supplier.name, [Validators.required]],
      code: [this.supplier.code, [Validators.required]],
    });
  }

  get name() {
    return this.supplierForm.get('name');
  }

  get code() {
    return this.supplierForm.get('code');
  }

  buildSupplierParams(): Supplier {
    return {
      id: this.supplierForm.get('id') ? this.supplierForm.get('id').value : '',
      name: this.name.value,
      code: this.code.value,
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
    if (!this.formService.isFormValid(this.supplierForm)) {
      return false;
    }
    this.submitForm.emit(this.buildSupplierParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.supplier && this.isLoading;
  }
}
