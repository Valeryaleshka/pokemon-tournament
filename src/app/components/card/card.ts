import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {IPokemon} from '@app/shared/types/pokemon.types';
import {CapitalizeFirstPipe} from '../../shared/pipes/capitalize-first-pipe';
import {PokemonTypeDirective} from '../../shared/directives/pokemon-type-color';

@Component({
  selector: 'app-card',
  imports: [
    NgOptimizedImage,
    CapitalizeFirstPipe,
    CapitalizeFirstPipe,
    PokemonTypeDirective
  ],
  templateUrl: './card.html',
  styleUrl: './card.less',
})
export class Card {
  pokemon = input.required<IPokemon>();
}
