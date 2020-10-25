import { Inject, Injectable } from '@angular/core';
import {
  AuthenticationSteps,
  SetPasswordRequest,
  ResetPasswordRequest
} from './authentication';
import { HttpService } from 'src/app/core/services/http.service';
import { AdminSerializerService } from '../admin/admin-serializer.service';
import { LoginRequest } from './login/login';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { StorageParams } from 'src/app/shared/models/general';
import { Admin } from '../admin/admin';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string;
  admin: Admin;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private httpService: HttpService,
    private adminSerializer: AdminSerializerService
  ) {}

  login(params: LoginRequest) {
    return this.httpService
      .post('login-admin', { ...params })
      .pipe(map((response) => this.adminSerializer.getAdmin(response.data)));
  }

  /**
   * sends an email with information to reset the password
   * @param params ResetPasswordRequest
   */
  resetPassword(params: ResetPasswordRequest) {
    return this.httpService
      .post('password-reset-link-by-email', params)
      .pipe(map(({ data: { message } }) => message));
  }

  setPassword(params: SetPasswordRequest) {
    return this.httpService.post('update-password-by-reset-token', params);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  deleteAuthentication() {
    return this.httpService.delete('authentication');
  }

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
      const admin: Admin = JSON.parse(
        this.storage.get(StorageParams.CURRENT_USER)
      );
      return admin;
    }
  }

  get isLoggedIn() {
    if (this.storage.has(StorageParams.CURRENT_USER)) {
      return true;
    }
    return false;
  }

  get isTopLevelPartner() {
    return this.getCurrentUser().isTopLevel;
  }
}
