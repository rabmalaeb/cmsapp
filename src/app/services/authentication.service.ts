import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AlertService } from './alert.service';
import { Admin } from '../modules/admin/admin';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  admin: Admin;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private alertService: AlertService,
    private logoutService: LogoutService
  ) {}

  setUserSession(admin: Admin) {
    this.storage.set('currentUser', JSON.stringify(admin));
  }

  /**
   * get user from local storage
   */
  getCurrentUser(): Admin {
    if (this.admin) {
      return this.admin;
    }
    if (this.storage.has('currentUser')) {
      const admin: Admin = JSON.parse(this.storage.get('currentUser'));
      return admin;
    }
  }

  get isLoggedIn() {
    if (this.storage.has('currentUser')) {
      return true;
    }
    return false;
  }

  logout() {
    this.alertService.confirm(
      'Are you sure you want to logout?',
      'Yes',
      'No',
      () => {
       this.logoutService.logout();
      }
    );
  }
}
