import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CapitalizeFirstPipe} from '@app/shared/pipes/capitalize-first-pipe';
import {IPokemon} from '@app/shared/types/pokemon.types';

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
