import {ISelectOption} from '../types/common.types';

export const MinPokemonId = 1;
export const MaxPokemonId = 151;

export const PokemonSortOptions: ISelectOption[] = [
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
