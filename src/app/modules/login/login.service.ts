import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators';
import { AdminSerializerService } from '../admin/admin-serializer.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpService: HttpService,
    private adminSerializer: AdminSerializerService,
    private authenticationService: AuthenticationService
  ) {}

  login(params) {
    return this.httpService.post('login-admin', { ...params }).pipe(
      map(response => {
        const admin = this.adminSerializer.getAdmin(response.data);
        this.authenticationService.setUserSession(admin);
        location.reload();
      })
    );
  }
}
