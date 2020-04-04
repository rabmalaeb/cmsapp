import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { RoleSerializerService } from './role-serializer.service';
import { map } from 'rxjs/operators';
import { RoleRequest, Role, RoleActionRequest } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private httpService: HttpService,
    private roleSerializer: RoleSerializerService
  ) {}

  getRoles(roleRequest: RoleRequest) {
    return this.httpService.get('roles', roleRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.roleSerializer.getRole(item)),
          paginator
        };
      })
    );
  }

  getRole(id: number) {
    return this.httpService.get(`roles/${id}`, {}).pipe(
      map(({ data }) => {
        return this.roleSerializer.getRole(data);
      })
    );
  }

  addRole(params: RoleActionRequest) {
    return this.httpService.post('roles', { ...params }).pipe(
      map(({ data }) => {
        return this.roleSerializer.getRole(data);
      })
    );
  }

  updateRole(id: number, params: RoleActionRequest) {
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
    return this.httpService.get(`role-by-partner/${partnerId}`, {}).pipe(
      map(response => {
        console.log('response da d a is ', response);

        return response.map(data => this.roleSerializer.getRole(data));
      })
    );
  }
}
