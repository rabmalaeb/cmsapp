import { Component, OnInit, Input } from '@angular/core';
import { PermissionGroup } from '../permission';

@Component({
  selector: 'app-permission-group',
  templateUrl: './permission-group.component.html',
  styleUrls: ['./permission-group.component.scss']
})
export class PermissionGroupComponent implements OnInit {
  constructor() {}

  @Input() permissionGroup: PermissionGroup;

  ngOnInit() {}

  togglePermissions() {
    let CheckedValue = true;
    if (this.areAllPermissionsChecked) {
      CheckedValue = false;
    }
    this.permissionGroup.permissions.forEach(permission => {
      permission.isChecked = CheckedValue;
    });
  }

  get areAllPermissionsChecked() {
    return this.permissionGroup.permissions.every(
      permission => permission.isChecked
    );
  }
}
