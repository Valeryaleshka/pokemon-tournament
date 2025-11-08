import { Component, input, model } from '@angular/core';
import { ISelectOption, ISortParams, SortOrder } from '@app/shared/types/common.types';
import { SORT_DIRECTION_LIST } from '@app/shared/constants/common.constans';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort',
  imports: [NgbDropdownModule],
  templateUrl: './sort.html',
  styleUrl: './sort.less',
})
export class SortComponent {
  sortOptions = input.required<ISelectOption[]>();
  currentSort = model.required<ISortParams>();

  protected sortDirectionList = SORT_DIRECTION_LIST;

  protected onFieldChange(option: ISelectOption): void {
    this.currentSort.set({
      ...this.currentSort(),
      value: option.value,
      valueTitle: option.valueTitle
    });
  }

  protected onDirectionChange(order: SortOrder): void {
    this.currentSort.set({
      ...this.currentSort(),
      direction: order.direction,
      directionTitle: order.directionTitle
    });
  }
}
