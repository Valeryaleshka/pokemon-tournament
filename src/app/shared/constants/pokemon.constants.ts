import {ISortOptions} from '../types/common.types';

export const MinPokemonId = 1;
export const MaxPokemonId = 151;

export const PokemonSortOptions: ISortOptions[] = [
  {
    value: 'name',
    title: 'Name',
  },
  {
    value: 'wins',
    title: 'Winnings',
  },
  {
    value: 'losses',
    title: 'Losses',
  },
  {
    value: 'winrate',
    title: 'Win Rate',
  },
  {
    value: 'ties',
    title: 'Ties',
  },
]
