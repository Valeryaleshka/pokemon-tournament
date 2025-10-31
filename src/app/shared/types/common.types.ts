export type SortDirection = 'asc' | 'desc';

export interface SortOrder {
  directionTitle: string;
  direction: SortDirection;
}

export interface ISelectOption {
  value: string;
  valueTitle: string;
}

export interface ISortParams extends ISelectOption, SortOrder {
}

