import { ISortParams } from '@app/shared/types/common.types';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SecondHeader } from '@app/components/second-header/second-header';
import { Header } from '@app/components/header/header';
import { Card } from '@app/components/card/card';
import { ScreenLoader } from '@app/shared/components/screen-loader/screen-loader';
import { ZoomOnHoverDirective } from '@app/shared/directives/zoom-on-hover.directive';
import { SortByPipe } from '@app/shared/pipes/sort-by-pipe';
import { SortComponent } from '@app/components/sort/sort';
import { PokemonService } from './services/pokemon.service';
import { POKEMON_SORT_OPTIONS } from '@app/shared/constants/pokemon.constants';
import { Cards } from '@app/components/cards/cards';
import { POKEMON_COUNT } from '../../shared/constants/pokemon.constants';

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
export class PokemonsPage implements OnInit {
  protected readonly pokemonService = inject(PokemonService);
  protected readonly pokemons = this.pokemonService.pokemons;
  protected sort = signal(defaultPokemonSortState);

  ngOnInit() {
    this.pokemonService.setNumberOfPokemons(POKEMON_COUNT)
  }

  pokemonSortOptions = POKEMON_SORT_OPTIONS;
}
