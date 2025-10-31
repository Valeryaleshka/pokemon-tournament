import {Component, input, output} from '@angular/core';
import {ISortOptions, ISortParams} from '../../shared/types/common.types';
import {SortDirectionList} from '../../shared/constants/common.constans';

@Component({
  selector: 'app-sort',
  imports: [],
  templateUrl: './sort.html',
  styleUrl: './sort.less',
})
export class Sort {
  currentValue = '';
  sortOptions = input.required<ISortOptions[]>();
  currentSort = input.required<ISortParams>();

  sortChange = output<ISortParams>();

  onFieldChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    this.sortChange.emit({
      ...this.currentSort(),
      value
    });
  }

  onDirectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const direction = select.value as 'asc' | 'desc';

    this.sortChange.emit({
      ...this.currentSort(),
      direction
    });
  }

  sortDirectionList = SortDirectionList
}
