import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { AuthenticationService } from './core/services/authentication.service';
import { AuthorizationService } from './core/services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'smartcms-app';
  isLoadingApp = false;
  subscriptions: Subscription[] = [];

  constructor(
    private notificationService: NotificationService,
    public errorSnackBar: MatSnackBar,
    public successSnackBar: MatSnackBar,
    private appService: AppService,
    public authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService
  ) {
    const errorClass = ['snack-bar_is-error'];
    const successClass = ['snack-bar_is-success'];
    this.subscriptions.push(
      this.notificationService.getErrorMessage().subscribe((message) => {
        errorSnackBar.open(message, 'Close', {
          duration: 3000,
          panelClass: errorClass,
          verticalPosition: 'top',
        });
      })
    );
    this.subscriptions.push(
      this.notificationService.getSuccessMessage().subscribe((message) => {
        successSnackBar.open(message, 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: successClass,
        });
      })
    );
  }

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    if (this.authenticationService.isLoggedIn) {
      this.authorizationService.getRolePermissions();
    }
  }

  get isAppLoading$(): Observable<boolean> {
    return this.authorizationService.isLoadingPermissions$;
  }

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  get isMenuOpened() {
    return this.appService.getIsMenuOpened();
  }

  closeMenu() {
    if (this.appService.getIsMenuOpened()) {
      this.appService.setIsMenuOpened(false);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
