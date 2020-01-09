import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isLoading = false;
  users: User[] = [];
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'mobile',
    'action'
  ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(response => {
      this.isLoading = false;
      this.users = response;
      this.setDataSource();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }
  addUser() {
    this.router.navigate(['users/add']);
  }

  editUser(id: number) {
    this.router.navigate([`users/${id}/view`]);
  }

  viewUser(id: number) {
    this.router.navigate([`user/${id}`]);
  }

  get canAddUser() {
    return this.authorizationService.canAdd(ModuleName.USERS);
  }

  get canDeleteUser() {
    return this.authorizationService.canDelete(ModuleName.USERS);
  }

  deleteUser(id: number) {
    this.alertService.confirm(
      'Are you sure you want to delete? ',
      'Yes',
      'No',
      () => {
        this.userService.deleteUser(id).subscribe(response => {
          this.users = response;
          this.setDataSource();
        });
      }
    );
  }
}
