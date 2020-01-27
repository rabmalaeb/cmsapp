import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';
import { AlertService } from 'src/app/services/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  isLoading = false;
  admins: Admin[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'email',
    'active',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.getAdmins();
  }

  getAdmins() {
    this.isLoading = true;
    this.adminService.getAdmins().subscribe(response => {
      this.isLoading = false;
      this.admins = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Admin>(this.admins);
    this.dataSource.paginator = this.paginator;
  }

  addAdmin() {
    this.router.navigate(['admins/add']);
  }

  editAdmin(id: number) {
    this.router.navigate([`admins/${id}/view`]);
  }

  viewAdmin(id: number) {
    this.router.navigate([`admin/${id}`]);
  }

  deleteAdmin(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.adminService.deleteAdmin(id).subscribe(response => {
          this.admins = response;
          this.setDataSource();
        });
      }
    );
  }

  get canAddAdmin(): Observable<boolean> {
    return this.authorizationService.canAdd(ModuleName.ADMINS);
  }

  get canDeleteAdmin(): Observable<boolean> {
    return this.authorizationService.canDelete(ModuleName.ADMINS);
  }
}
