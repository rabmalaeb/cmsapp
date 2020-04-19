import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Admin } from '../../modules/admin/admin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  admin: Admin;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  logout() {
    this.storage.clear();
    this.router.navigate(['login']).then(() => {
      location.reload();
    });
  }
}
