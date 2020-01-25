import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreSelectors, UserStoreActions } from 'src/app/root-store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isLoading = false;
  users: User[] = [];

  users$: Observable<User[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'mobile',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authorizationService: AuthorizationService,
    private store$: Store<RootStoreState.State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.users$ = this.store$.select(
      UserStoreSelectors.selectAllUserItems
    );

    this.error$ = this.store$.select(
      UserStoreSelectors.selectUserError
    );

    this.isLoading$ = this.store$.select(
      UserStoreSelectors.selectUserIsLoading
    );

    this.store$.dispatch(
      new UserStoreActions.LoadRequestAction()
    );
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
