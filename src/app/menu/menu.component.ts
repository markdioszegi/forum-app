import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { RolePipe } from '../pipes/role.pipe';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [RouterLink, RolePipe],
})
export class MenuComponent {
  constructor(private userService: UserService) {}

  get activeUser() {
    return this.userService.selectedUser;
  }
}
