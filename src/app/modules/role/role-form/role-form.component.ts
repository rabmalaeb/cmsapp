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
import { Role, RoleActionRequest } from '../role';
import { PermissionGroup, Permission } from '../../permissions/permission';
import { PermissionSerializerService } from '../../permissions/permission-serializer.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Partner } from '../../partner/partner';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.sass']
})
export class RoleFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService,
    private authenticationService: AuthenticationService,
    private permissionSerializer: PermissionSerializerService
  ) {}

  roleForm: FormGroup;
  permissionGroups: PermissionGroup[];
  formGroupDirective: FormGroupDirective;
  @Input() role: Role;
  @Input() actionType: ActionType;
  @Input() partners: Partner[];
  @Input() permissions: Permission[];
  @Input() isLoadingAction: boolean;
  @Input() isLoading: boolean;
  @Input() canEditRole = false;
  @Output() submitForm = new EventEmitter<RoleActionRequest>();

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    this.setPermissionGroups();
    if (this.permissions) {
      this.setCheckedPermissions();
    }
    if (this.role) {
      this.buildExistingRoleForm();
    } else {
      this.buildNewRoleForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  setPermissionGroups() {
    this.permissionGroups = this.permissionSerializer.groupPermissions(
      this.permissions
    );
  }

  setCheckedPermissions() {
    if (this.role) {
      this.permissionGroups.forEach(group => {
        group.permissions.forEach(groupPermission => {
          this.role.permissions.forEach(permission => {
            if (groupPermission.id === permission.id) {
              groupPermission.isChecked = true;
            }
          });
        });
      });
    }
  }

  buildNewRoleForm() {
    const partnerId = this.authenticationService.getCurrentUser().partnerId;
    this.roleForm = this.form.group({
      name: ['', [Validators.required]],
      partnerId: [partnerId ? partnerId : '', [Validators.required]],
    });
  }

  buildExistingRoleForm() {
    this.roleForm = this.form.group({
      id: [this.role.id],
      name: [this.role.name, [Validators.required]],
      partnerId: ['', [Validators.required]],
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  get partnerId() {
    return this.roleForm.get('partnerId');
  }

  buildRoleParams(): RoleActionRequest {
    return {
      id: this.roleForm.get('id') ? this.roleForm.get('id').value : '',
      name: this.name.value,
      partnerId: this.partnerId.value,
      permissions: this.getSelectedPermissions()
    };
  }

  getSelectedPermissions() {
    const selectedPermissions: number[] = [];
    this.permissionGroups.forEach(group => {
      group.permissions.forEach(permission => {
        if (permission.isChecked) {
          selectedPermissions.push(permission.id);
        }
      });
    });
    return selectedPermissions;
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
    if (!this.formService.isFormValid(this.roleForm)) {
      return false;
    }
    this.submitForm.emit(this.buildRoleParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.role && this.isLoading;
  }
}
