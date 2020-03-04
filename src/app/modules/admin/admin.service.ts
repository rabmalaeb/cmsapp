import { Injectable } from '@angular/core';
import { AdminSerializerService } from './admin-serializer.service';
import { map, take } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { AdminRequest } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private httpService: HttpService,
    private adminSerializer: AdminSerializerService
  ) {}

  getAdmins(adminRequest: AdminRequest) {
    return this.httpService.request('admins', adminRequest).pipe(
      map(response => {
        return response.map(data => this.adminSerializer.getAdmin(data));
      })
    );
  }

  getAdmin(id: number) {
    return this.httpService.request(`admins/${id}`, {}).pipe(
      map(({ data }) => {
        return this.adminSerializer.getAdmin(data);
      })
    );
  }

  addAdmin(params) {
    return this.httpService.post('admins', { ...params }).pipe(
      map(({ data }) => {
        return this.adminSerializer.getAdmin(data);
      })
    );
  }

  updateAdmin(id: number, params) {
    return this.httpService.put(`admins/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.adminSerializer.getAdmin(data);
      })
    );
  }

  deleteAdmin(id: number) {
    return this.httpService.delete(`admins/${id}`).pipe(
      map(response => {
        return response.map(data => this.adminSerializer.getAdmin(data));
      })
    );
  }
}
