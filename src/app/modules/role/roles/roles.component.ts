import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { ModuleName } from 'src/app/models/general';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  isLoading = false;
  roles: Role[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'action'
  ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe(response => {
      this.isLoading = false;
      this.roles = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Role>(this.roles);
    this.dataSource.paginator = this.paginator;
  }
  addRole() {
    this.router.navigate(['roles/add']);
  }

  editRole(id: number) {
    this.router.navigate([`roles/${id}/view`]);
  }

  viewRole(id: number) {
    this.router.navigate([`role/${id}`]);
  }

  deleteRole(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.roleService.deleteRole(id).subscribe(response => {
          this.roles = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddRole() {
    return this.authorizationService.canAdd(ModuleName.ROLES);
  }

  get canDeleteRole() {
    return this.authorizationService.canDelete(ModuleName.ROLES);
  }
}
