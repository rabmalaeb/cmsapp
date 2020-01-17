import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { Permission } from '../permission';
import { PermissionService } from '../permission.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  isLoading = false;
  permissions: Permission[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'group',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private permissionService: PermissionService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    this.isLoading = true;
    this.permissionService.getPermissions().subscribe(response => {
      this.isLoading = false;
      this.permissions = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Permission>(this.permissions);
    this.dataSource.paginator = this.paginator;
  }
  addPermission() {
    this.router.navigate(['permissions/add']);
  }

  editPermission(id: number) {
    this.router.navigate([`permissions/${id}/view`]);
  }

  viewPermission(id: number) {
    this.router.navigate([`permission/${id}`]);
  }

  deletePermission(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.permissionService.deletePermission(id).subscribe(response => {
          this.permissions = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddPermission() {
    return this.authorizationService.canAdd(ModuleName.PERMISSIONS);
  }

  get canDeletePermission() {
    return this.authorizationService.canDelete(ModuleName.PERMISSIONS);
  }
}
