import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHTTPResponse, apiUrl } from '../../common';
import { Role } from '../../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoleById(roleId: number) {
    return this.http.get<CustomHTTPResponse>(`${apiUrl}/role/${roleId}`);
  }

  updateRoleById(role: Role) {
    return this.http.put(`${apiUrl}/role/${role.id}`, role);
  }
}
