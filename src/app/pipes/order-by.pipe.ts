import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  standalone: true,
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], column: string, order: string): any[] {
    if (!value || !column || column === '' || order === '') {
      return value;
    }

    return value.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return order === 'asc' ? valA - valB : valB - valA;
      }
    });
  }
}
