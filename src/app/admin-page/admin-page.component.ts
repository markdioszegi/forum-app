import { Component, OnInit } from '@angular/core';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { RIGHTS, ROLES, getPermissionLevel } from '../common';
import { RolePipe } from '../pipes/role.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule } from '@angular/forms';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role/role.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    RoleSelectorComponent,
    RolePipe,
    OrderByPipe,
    UsersListComponent,
    FormsModule,
  ],
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {
  users!: User[];
  selectedRole!: Role;

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.onRoleSelected(0);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  onRoleSelected(role: ROLES) {
    this.roleService
      .getRoleById(role)
      .subscribe((role) => (this.selectedRole = role.data));
  }

  onSubmit() {
    this.roleService
      .updateRoleById(this.selectedRole)
      .subscribe((res) => console.log(res));
  }

  get permission() {
    return getPermissionLevel(this.selectedRole.id);
  }

  get filteredUsers(): { usersByRole: User[]; users: User[] } {
    return {
      usersByRole: this.users.filter(
        (user) => user.role === this.selectedRole.id
      ),
      users: this.users.filter((user) => user.role !== this.selectedRole.id),
    };
  }
}
