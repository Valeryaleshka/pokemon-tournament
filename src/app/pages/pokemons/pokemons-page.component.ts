import {Component, inject, OnInit} from '@angular/core';
import {SecondHeader} from '../../components/second-header/second-header';
import {Header} from '../../components/header/header';
import {CardWrapper} from '../../components/card-wrapper/card-wrapper';
import {Card} from '../../components/card/card';
import {PokemonService} from './services/pokemon.service';
import {Sort} from '../../components/sort/sort';
import {PokemonSortOptions} from '../../shared/constants/pokemon.constants';
import {ISortParams} from '../../shared/types/common.types';

@Component({
  selector: 'app-pokemons',
  imports: [
    SecondHeader,
    Header,
    CardWrapper,
    Card,
    Sort,
  ],
  providers: [PokemonService],
  standalone: true,
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.less',
})
export class PokemonsPage implements OnInit {
  pokemonService = inject(PokemonService);
  pokemons = this.pokemonService.pokemons;


  ngOnInit() {
    this.pokemonService.initPokemons(16);
  }

  sortChanged(sort: ISortParams) {
    this.pokemonService.setCurrentSort(sort);
  }

  pokemonSortOptions = PokemonSortOptions
}
