import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  selectActiveUser(user: User) {
    this.userService.selectedUser = user;
  }
}
