import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoleService } from 'src/app/modules/role/role.service';
import { Role } from 'src/app/modules/role/role';
import { AppService } from 'src/app/core/services/app.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { ConfirmMessages } from 'src/app/shared/models/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { LogoutService } from 'src/app/core/services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  role: Role;
  isLoading: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private appService: AppService,
    private logoutService: LogoutService,
    private alertService: AlertService,
    private roleService: RoleService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getRole();
  }

  get user() {
    return this.authenticationService.getCurrentUser();
  }

  getRole() {
    this.isLoading = true;
    this.subscriptions.push(
      this.roleService.getRole(this.user.roleId).subscribe((response) => {
        this.isLoading = false;
        this.role = response;
      })
    );
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.appService.setIsMenuOpened(!this.appService.getIsMenuOpened());
  }

  logout() {
    this.alertService.confirm(
      ConfirmMessages.CONFIRM_LOGOUT,
      'Yes',
      'No',
      () => {
        this.logoutService.logout();
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
