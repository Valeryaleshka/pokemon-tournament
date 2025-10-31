import {Component, input, output} from '@angular/core';
import {ISelectOption, ISortParams, SortOrder} from '../../shared/types/common.types';
import {SortDirectionList} from '../../shared/constants/common.constans';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort',
  imports: [NgbDropdownModule],
  templateUrl: './sort.html',
  styleUrl: './sort.less',
})
export class Sort {
  sortOptions = input.required<ISelectOption[]>();
  currentSort = input.required<ISortParams>();

  sortChange = output<ISortParams>();

  onFieldChange(option: ISelectOption): void {
    this.sortChange.emit({
      ...this.currentSort(),
      value: option.value,
      valueTitle: option.valueTitle
    });
  }

  onDirectionChange(order: SortOrder): void {
    this.sortChange.emit({
      ...this.currentSort(),
      direction: order.direction,
      directionTitle: order.directionTitle
    });
  }

  sortDirectionList = SortDirectionList
}
