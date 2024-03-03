import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'forum-app';

  constructor(private userService: UserService) {
    userService
      .getUser(0)
      .subscribe((user) => (userService.selectedUser = user));
  }
}
