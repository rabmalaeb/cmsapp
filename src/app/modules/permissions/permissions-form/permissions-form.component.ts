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
import { ValidationMessagesService } from '../../../core/services/validation-messages.service';
import { ActionType, PermissionType } from '../../../shared/models/general';
import { Permission, PermissionActionRequest } from '../permission';
import { capitalize } from '../../../shared/utils/general';
import { AppService } from '../../../core/services/app.service';
import { NavItem } from 'src/app/shared/models/nav';
import { FormService } from 'src/app/core/services/form.service';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import { Labels } from 'src/app/shared/models/input';

@Component({
  selector: 'app-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.sass'],
})
export class PermissionFormComponent
  extends BaseFormComponent
  implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private appService: AppService,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {
    super();
  }

  @Input() permission: Permission;
  @Input() canEditPermission = false;
  permissionForm: FormGroup;
  appModules: NavItem[];
  permissionTypes: PermissionType[] = [
    PermissionType.ADD,
    PermissionType.VIEW,
    PermissionType.EDIT,
    PermissionType.DELETE,
  ];

  ngOnInit() {
    this.getAppModules();
  }

  ngOnChanges() {
    if (this.isLoadingAction || (this.actionError && this.permissionForm)) {
      return false;
    }
    if (this.permission) {
      this.buildExistingPermissionForm();
    } else {
      this.buildNewPermissionForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewPermissionForm() {
    this.permissionForm = this.form.group({
      modules: ['', [Validators.required]],
      permissionType: ['', [Validators.required]],
    });
  }

  buildExistingPermissionForm() {
    this.permissionForm = this.form.group({
      id: [this.permission.id],
      modules: [this.permission.group, [Validators.required]],
      permissionType: [this.permission.type, [Validators.required]],
    });
  }

  get modules() {
    return this.permissionForm.get('modules');
  }

  get permissionType() {
    return this.permissionForm.get('permissionType');
  }

  getAppModules() {
    this.appModules = this.appService.activeNavBarItems;
  }

  buildPermissionParams(): PermissionActionRequest {
    return {
      id: this.permissionForm.get('id')
        ? this.permissionForm.get('id').value
        : '',
      name: `Can ${capitalize(this.permissionType.value)} ${
        this.modules.value
      }`,
      type: this.permissionType.value,
      group: this.modules.value,
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
    if (!this.formService.isFormValid(this.permissionForm)) {
      return false;
    }
    this.submitForm.emit(this.buildPermissionParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.permission && this.isLoading;
  }
}
