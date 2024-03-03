import { Component, Input } from '@angular/core';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { User } from '../../models/user.model';
import { ROLES } from '../../common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [OrderByPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  @Input() users!: User[];
  sortColumn: string = 'id';
  sortOrder: string = 'asc';

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
  }
}
