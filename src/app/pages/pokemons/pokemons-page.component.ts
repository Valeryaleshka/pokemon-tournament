import {ISortParams} from '@app/shared/types/common.types';
import {Component, inject, signal} from '@angular/core';
import {SecondHeader} from '@app/components/second-header/second-header';
import {Header} from '@app/components/header/header';
import {Card} from '@app/components/card/card';
import {ScreenLoader} from '@app/shared/components/screen-loader/screen-loader';
import {ZoomOnHoverDirective} from '@app/shared/directives/zoom-on-hover.directive';
import {SortByPipe} from '@app/shared/pipes/sort-by-pipe';
import {SortComponent} from '@app/components/sort/sort';
import {PokemonService} from './services/pokemon.service';
import {POKEMON_SORT_OPTIONS} from '@app/shared/constants/pokemon.constants';
import { Cards } from '@app/components/cards/cards';

export const defaultPokemonSortState: ISortParams = {
  directionTitle: 'Ascending',
  direction: 'asc',
  valueTitle: 'Name',
  value: 'name'
};

@Component({
  selector: 'app-pokemons',
  imports: [
    SecondHeader,
    Header,
    Card,
    ScreenLoader,
    ZoomOnHoverDirective,
    SortByPipe,
    SortComponent,
    SecondHeader,
    Cards,
  ],
  providers: [PokemonService],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.less',
})
export class PokemonsPage {
  protected readonly pokemonService = inject(PokemonService);
  pokemons = this.pokemonService.pokemons;
  sort = signal(defaultPokemonSortState);

  pokemonSortOptions = POKEMON_SORT_OPTIONS;
}
