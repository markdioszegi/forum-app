import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROLES } from '../../common';
import { RolePipe } from '../../pipes/role.pipe';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [RolePipe],
  templateUrl: './role-selector.component.html',
})
export class RoleSelectorComponent {
  isDropdownOpen: boolean = false;
  @Output() roleSelected: EventEmitter<ROLES> = new EventEmitter<ROLES>();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  get roles(): number[] {
    return Object.values(ROLES).filter(
      (value) => typeof value === 'number'
    ) as number[];
  }

  setCurrentRole(role: ROLES) {
    this.roleSelected.emit(role);

    this.toggleDropdown();
  }
}
