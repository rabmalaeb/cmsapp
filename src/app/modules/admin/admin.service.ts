import { Injectable } from '@angular/core';
import { AdminSerializerService } from './admin-serializer.service';
import { map, take } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { AdminRequest, Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private httpService: HttpService,
    private adminSerializer: AdminSerializerService
  ) {}

  getAdmins(adminRequest: AdminRequest) {
    return this.httpService.get('admins', adminRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.adminSerializer.getAdmin(item)),
          paginator
        };
      })
    );
  }

  getAdmin(id: number) {
    return this.httpService.get(`admins/${id}`, {}).pipe(
      map(({ data }) => {
        return this.adminSerializer.getAdmin(data);
      })
    );
  }

  addAdmin(params: Admin) {
    return this.httpService.post('admins', { ...params }).pipe(
      map(({ data }) => {
        return this.adminSerializer.getAdmin(data);
      })
    );
  }

  updateAdmin(id: number, params: Admin) {
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
