import { Component, OnInit } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { AuthenticationService } from './core/services/authentication.service';
import { AuthorizationService } from './core/services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smartcms-app';
  isLoadingApp = false;

  constructor(
    private notificationService: NotificationService,
    public errorSnackBar: MatSnackBar,
    public successSnackBar: MatSnackBar,
    public authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
  ) {
    const errorClass = ['snack-bar_is-error'];
    const successClass = ['snack-bar_is-success'];
    this.notificationService.getErrorMessage().subscribe(message => {
      errorSnackBar.open(message, 'Close', {
        duration: 1000,
        panelClass: errorClass,
        verticalPosition: 'top'
      });
    });
    this.notificationService.getSuccessMessage().subscribe(message => {
      successSnackBar.open(message, 'Close', {
        duration: 1000,
        verticalPosition: 'top',
        panelClass: successClass
      });
    });
  }

  ngOnInit() {
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
}
