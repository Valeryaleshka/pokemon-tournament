import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {IPokemon} from '../../shared/types/pokemon.types';
import {CapitalizeFirstPipe} from '../../shared/pipes/capitalize-first-pipe';

@Component({
  selector: 'app-card',
  imports: [
    NgOptimizedImage,
    CapitalizeFirstPipe
  ],
  templateUrl: './card.html',
  styleUrl: './card.less',
})
export class Card {
  pokemon = input.required<IPokemon>();
}
