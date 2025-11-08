import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prettyjson' })
export class PrettyJsonPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}
