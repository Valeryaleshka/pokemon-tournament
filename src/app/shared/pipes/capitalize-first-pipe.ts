import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string): string {
    if (!value.length) {
      return value;
    }

    return value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
