import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, map } from 'rxjs';
import { CustomHTTPResponse, apiUrl, getPermissionLevel } from '../../common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser!: User;

  get permissionLevel() {
    return getPermissionLevel(this.selectedUser.role);
  }

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<CustomHTTPResponse>(`${apiUrl}/users`)
      .pipe(map((res) => res.data));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<CustomHTTPResponse>(`${apiUrl}/user/${id}`)
      .pipe(map((res) => res.data));
  }

  updateUser(id: number, editedUser: Partial<User>) {
    return this.http.put(`${apiUrl}/user/${id}`, editedUser);
  }

  updatePassword(
    id: number,
    newPassword: { password1: string; password2: string }
  ) {
    return this.http.put(`${apiUrl}/user/${id}/password`, newPassword);
  }
}
