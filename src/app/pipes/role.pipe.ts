import { Pipe, PipeTransform } from '@angular/core';
import { ROLES } from '../common';

@Pipe({
  name: 'role',
  standalone: true,
})
export class RolePipe implements PipeTransform {
  transform(role: number): string {
    return ROLES[role];
  }
}
