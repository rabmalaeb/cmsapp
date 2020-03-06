import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { PermissionSerializerService } from './permission-serializer.service';
import { map } from 'rxjs/operators';
import { PermissionRequest } from './permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private httpService: HttpService,
    private permissionSerializer: PermissionSerializerService
  ) {}

  getPermissions(permissionRequest: PermissionRequest) {
    return this.httpService.request('permissions', permissionRequest).pipe(
      map(response => {
        return response.map(data =>
          this.permissionSerializer.getPermission(data)
        );
      })
    );
  }

  getGroupedPermissions() {
    return this.httpService.request('permissions', {}).pipe(
      map(response => {
        return this.permissionSerializer.getGroupedPermissions(response);
      })
    );
  }

  getPermission(id: number) {
    return this.httpService.request(`permissions/${id}`, {}).pipe(
      map(({ data }) => {
        return this.permissionSerializer.getPermission(data);
      })
    );
  }

  addPermission(params: PermissionRequest) {
    return this.httpService.post('permissions', { ...params }).pipe(
      map(({ data }) => {
        return this.permissionSerializer.getPermission(data);
      })
    );
  }

  updatePermission(id: number, params: PermissionRequest) {
    return this.httpService.put(`permissions/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.permissionSerializer.getPermission(data);
      })
    );
  }

  deletePermission(id: number) {
    return this.httpService.delete(`permissions/${id}`).pipe(
      map(response => {
        return response.map(data =>
          this.permissionSerializer.getPermission(data)
        );
      })
    );
  }

  getPermissionByRoleId(id: number) {
    return this.httpService.request('permissions-by-role', { id }).pipe(
      map(response => {
        return response.map(data =>
          this.permissionSerializer.getPermission(data, true)
        );
      })
    );
  }
}
