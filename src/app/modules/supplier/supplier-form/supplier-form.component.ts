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
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES } from 'src/app/models/general';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.sass']
})
export class SupplierFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  supplierForm: FormGroup;
  @Input() supplier: Supplier;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditSupplier = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Supplier>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
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
      code: ['', [Validators.required]]
    });
  }

  buildExistingSupplierForm() {
    this.supplierForm = this.form.group({
      id: [this.supplier.id],
      name: [this.supplier.name, [Validators.required]],
      code: [this.supplier.code, [Validators.required]]
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
    if (!this.supplierForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
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
