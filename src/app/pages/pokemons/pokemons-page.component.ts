import {Component, inject, OnInit} from '@angular/core';
import {SecondHeader} from '../../components/second-header/second-header';
import {Header} from '../../components/header/header';
import {CardWrapper} from '../../components/card-wrapper/card-wrapper';
import {Card} from '../../components/card/card';
import {PokemonService} from './services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  imports: [
    SecondHeader,
    Header,
    CardWrapper,
    Card,
  ],
  providers: [PokemonService],
  standalone: true,
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.less',
})
export class PokemonsPage implements OnInit {
  generatePokemonService = inject(PokemonService);

  ngOnInit() {
    this.generatePokemonService.initPokemons(16);
  }
}
