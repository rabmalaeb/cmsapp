import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AlertService } from './alert.service';
import { Admin } from '../../modules/admin/admin';
import { LogoutService } from './logout.service';
import { StorageParams } from 'src/app/shared/models/general';

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
    this.storage.set(StorageParams.CURRENT_USER, JSON.stringify(admin));
  }

  /**
   * get user from local storage
   */
  getCurrentUser(): Admin {
    if (this.admin) {
      return this.admin;
    }
    if (this.storage.has(StorageParams.CURRENT_USER)) {
      const admin: Admin = JSON.parse(this.storage.get(StorageParams.CURRENT_USER));
      return admin;
    }
  }

  get isLoggedIn() {
    if (this.storage.has(StorageParams.CURRENT_USER)) {
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
