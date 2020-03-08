import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs/operators';
import { AdminSerializerService } from '../admin/admin-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpService: HttpService,
    private adminSerializer: AdminSerializerService,
  ) {}

  login(params) {
    return this.httpService.post('login-admin', { ...params }).pipe(
      map(response => this.adminSerializer.getAdmin(response.data))
    );
  }
}
