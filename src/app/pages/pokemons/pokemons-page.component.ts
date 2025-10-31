import {ISortParams} from '@app/shared/types/common.types';
import {Component, inject, OnInit, signal} from '@angular/core';
import {SecondHeader} from '@app/components/second-header/second-header';
import {Header} from '@app/components/header/header';
import {CardWrapper} from '@app/components/card-wrapper/card-wrapper';
import {Card} from '@app/components/card/card';
import {ScreenLoader} from '@app/shared/components/screen-loader/screen-loader';
import {ZoomOnHoverDirective} from '@app/shared/directives/zoom-on-hover.directive';
import {SortByPipe} from '@app/shared/pipes/sort-by-pipe';
import {SortComponent} from '@app/components/sort/sort';
import {PokemonService} from './services/pokemon.service';
import {POKEMON_SORT_OPTIONS} from '@app/shared/constants/pokemon.constants';
import {sortBy} from '@app/shared/helpers/sort.helper';

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
    CardWrapper,
    Card,
    ScreenLoader,
    ZoomOnHoverDirective,
    SortByPipe,
    SortComponent,
  ],
  providers: [PokemonService],
  standalone: true,
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.less',
})
export class PokemonsPage implements OnInit {
  pokemonService = inject(PokemonService);
  pokemons = this.pokemonService.pokemons;
  sort = signal(defaultPokemonSortState);

  ngOnInit() {
    this.pokemonService.initPokemons(16);
  }

  sortChanged(sort: ISortParams) {
    this.sort.set(sort);
  }

  pokemonSortOptions = POKEMON_SORT_OPTIONS;
  protected readonly sortBy = sortBy;
}
