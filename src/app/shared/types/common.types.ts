export type SortDirection = 'asc' | 'desc';

export interface SortOrder {
  title: string;
  direction: SortDirection;
}

export interface ISortParams extends SortOrder {
  value: string;
}

export interface ISortOptions extends Omit<ISortParams, 'direction'> {
}
