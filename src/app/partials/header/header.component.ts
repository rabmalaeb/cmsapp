import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RoleService } from 'src/app/modules/role/role.service';
import { Role } from 'src/app/modules/role/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  role: Role;
  isLoading: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.getRole();
  }

  get user() {
    return this.authenticationService.getCurrentUser();
  }

  getRole() {
    this.isLoading = true;
    this.roleService.getRole(this.user.roleId).subscribe(response => {
      this.isLoading = false;
      this.role = response;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
