import { Pipe, PipeTransform } from '@angular/core';
import { ISortParams } from '../types/common.types';
import { sortBy } from '../helpers/sort.helper';


@Pipe({
  name: 'sortBy'
})
export class SortByPipe<T> implements PipeTransform {

  transform(collection: T[] | null | undefined, sort: ISortParams): T[] {
    return sortBy(sort, collection ?? [])
  }
}
