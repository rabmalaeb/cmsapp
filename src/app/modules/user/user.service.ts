import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { UserSerializerService } from './user-serializer.service';
import { map } from 'rxjs/operators';
import { User, UserRequest } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpService: HttpService,
    private userSerializer: UserSerializerService
  ) {}

  getUsers(userRequest: UserRequest) {
    return this.httpService.request('users', userRequest).pipe(
      map(response => {
        return response.map(data => this.userSerializer.getUser(data));
      })
    );
  }

  getUser(id: number) {
    return this.httpService.request(`users/${id}`, {}).pipe(
      map(({ data }) => {
        return this.userSerializer.getUser(data);
      })
    );
  }

  addUser(params: User) {
    return this.httpService.post('users', { ...params }).pipe(
      map(({ data }) => {
        return this.userSerializer.getUser(data);
      })
    );
  }

  updateUser(id: number, params: User) {
    return this.httpService.put(`users/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.userSerializer.getUser(data);
      })
    );
  }

  deleteUser(id: number) {
    return this.httpService.delete(`users/${id}`).pipe(
      map(response => {
        return response.map(data => this.userSerializer.getUser(data));
      })
    );
  }
}
