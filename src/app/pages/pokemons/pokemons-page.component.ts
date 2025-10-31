import { Component, inject, OnInit, signal } from '@angular/core';
import {SecondHeader} from '../../components/second-header/second-header';
import {Header} from '../../components/header/header';
import {CardWrapper} from '../../components/card-wrapper/card-wrapper';
import {Card} from '../../components/card/card';
import {PokemonService} from './services/pokemon.service';
import {POKEMON_SORT_OPTIONS} from '../../shared/constants/pokemon.constants';
import {ISortParams} from '../../shared/types/common.types';
import {ScreenLoader} from '../../shared/components/screen-loader/screen-loader';
import {ZoomOnHoverDirective} from '../../shared/directives/zoom-on-hover.directive';
import { sortBy } from '../../shared/helpers/sort.helper';
import { SortByPipe } from '../../shared/pipes/sort-by-pipe';
import { SortComponent } from '../../components/sort/sort';

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
