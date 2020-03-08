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
import { NotificationService } from '../../../core/services/notification.service';
import {
  ActionType,
  ALERT_MESSAGES,
  NavItem,
  PermissionType
} from '../../../shared/models/general';
import { Permission, PermissionRequest } from '../permission';
import { capitalize } from '../../../shared/utils/general';
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'app-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.sass']
})
export class PermissionFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private appService: AppService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  @Input() permission: Permission;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditPermission = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<PermissionRequest>();
  formGroupDirective: FormGroupDirective;
  permissionForm: FormGroup;
  appModules: NavItem[];
  permissionTypes: PermissionType[] = [
    PermissionType.ADD,
    PermissionType.VIEW,
    PermissionType.EDIT,
    PermissionType.DELETE
  ];

  ngOnInit() {
    this.getAppModules();
  }

  ngOnChanges() {
    if (this.isLoadingAction) {
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
      permissionType: ['', [Validators.required]]
    });
  }

  buildExistingPermissionForm() {
    this.permissionForm = this.form.group({
      id: [this.permission.id],
      modules: [this.permission.group.toLowerCase(), [Validators.required]],
      permissionType: [this.permission.type, [Validators.required]]
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

  buildPermissionParams(): PermissionRequest {
    return {
      id: this.permissionForm.get('id')
        ? this.permissionForm.get('id').value
        : '',
      name: `Can ${capitalize(this.permissionType.value)} ${
        this.modules.value
      }`,
      type: this.permissionType.value,
      group: this.modules.value
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
    if (!this.permissionForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
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
