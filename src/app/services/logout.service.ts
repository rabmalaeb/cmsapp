import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AlertService } from './alert.service';
import { Admin } from '../modules/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  admin: Admin;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  logout() {
    this.storage.clear();
    location.reload();
  }
}
