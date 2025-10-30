import {Component, input} from '@angular/core';
import {Pokemon} from '../../pages/pokemons/interfaces/pokemon.interfaces';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card.html',
  styleUrl: './card.less',
})
export class Card {
  pokemon = input.required<Pokemon>();
}
