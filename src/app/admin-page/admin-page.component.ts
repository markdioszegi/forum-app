import { Component, OnInit } from '@angular/core';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { ROLES } from '../common';
import { RolePipe } from '../pipes/role.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RoleSelectorComponent, RolePipe, OrderByPipe, UsersListComponent],
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {
  users!: User[];
  selectedRole = ROLES.Guests;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  onRoleSelected(role: ROLES) {
    this.selectedRole = role;
  }

  get filteredUsers(): { usersByRole: User[]; users: User[] } {
    return {
      usersByRole: this.users.filter((user) => user.role === this.selectedRole),
      users: this.users.filter((user) => user.role !== this.selectedRole),
    };
  }
}
