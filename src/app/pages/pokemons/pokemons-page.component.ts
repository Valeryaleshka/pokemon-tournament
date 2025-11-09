import { ISortParams } from '@app/shared/types/common.types';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SecondHeader } from '@app/components/second-header/second-header';
import { Card } from '@app/components/card/card';
import { ScreenLoader } from '@app/shared/components/screen-loader/screen-loader';
import { ZoomOnHoverDirective } from '@app/shared/directives/zoom-on-hover.directive';
import { SortByPipe } from '@app/shared/pipes/sort-by-pipe';
import { SortComponent } from '@app/components/sort/sort';
import { PokemonService } from './services/pokemon.service';
import { POKEMON_COUNT, POKEMON_SORT_OPTIONS } from '@app/shared/constants/pokemon.constants';
import { Cards } from '@app/components/cards/cards';
import { RouterLink } from '@angular/router';

export const defaultPokemonSortState: ISortParams = {
  directionTitle: 'Ascending',
  direction: 'asc',
  valueTitle: 'Name',
  value: 'name',
};

@Component({
  selector: 'app-pokemons',
  imports: [
    SecondHeader,
    Card,
    ScreenLoader,
    ZoomOnHoverDirective,
    SortByPipe,
    SortComponent,
    SecondHeader,
    Cards,
    RouterLink,
  ],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.less',
})
export class PokemonsPage implements OnInit {
  protected readonly pokemonService = inject(PokemonService);
  protected readonly pokemons = this.pokemonService.pokemons;
  protected sort = signal(defaultPokemonSortState);

  ngOnInit() {
    console.log(this.pokemons());
    if (!this.pokemons().length) {
      this.pokemonService.setNumberOfPokemons(POKEMON_COUNT);
    }
  }

  pokemonSortOptions = POKEMON_SORT_OPTIONS;
}
