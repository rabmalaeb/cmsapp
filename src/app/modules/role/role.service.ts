import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { RoleSerializerService } from './role-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private httpService: HttpService,
    private roleSerializer: RoleSerializerService
  ) {}

  getRoles() {
    return this.httpService.request('roles', {}).pipe(
      map(response => {
        return response.map(data => this.roleSerializer.getRole(data));
      })
    );
  }

  getRole(id: number) {
    return this.httpService.request(`roles/${id}`, {}).pipe(
      map(({ data }) => {
        return this.roleSerializer.getRole(data);
      })
    );
  }

  addRole(params) {
    return this.httpService.post('roles', { ...params }).pipe(
      map(({ data }) => {
        return this.roleSerializer.getRole(data);
      })
    );
  }

  updateRole(id, params) {
    return this.httpService.put(`roles/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.roleSerializer.getRole(data);
      })
    );
  }

  deleteRole(id: number) {
    return this.httpService.delete(`roles/${id}`).pipe(
      map(response => {
        return response.map(data => this.roleSerializer.getRole(data));
      })
    );
  }

  getRoleByPartner(partnerId: number) {
    return this.httpService.request(`role-by-partner/${partnerId}`, {}).pipe(
      map(response => {
        console.log('response da d a is ',response);

        return response.map(data => this.roleSerializer.getRole(data));
      })
    );
  }
}
