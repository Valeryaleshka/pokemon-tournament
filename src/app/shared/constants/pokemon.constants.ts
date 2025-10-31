import {ISelectOption} from '../types/common.types';

export const MIN_POKEMON_ID = 1;
export const MAX_POKEMON_ID = 151;
export const POKEMON_COUNT = 16;

export const POKEMON_SORT_OPTIONS: ISelectOption[] = [
  {
    value: 'name',
    valueTitle: 'Name',
  },
  {
    value: 'wins',
    valueTitle: 'Winnings',
  },
  {
    value: 'losses',
    valueTitle: 'Losses',
  },
  {
    value: 'winrate',
    valueTitle: 'Win Rate',
  },
  {
    value: 'ties',
    valueTitle: 'Ties',
  },
]
