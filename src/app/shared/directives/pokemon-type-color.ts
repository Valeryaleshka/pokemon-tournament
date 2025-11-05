import { Directive, effect, ElementRef, inject, input, Input, OnInit, Renderer2 } from '@angular/core';
import {PokemonType} from '../types/pokemon.types';

@Directive({
  selector: '[appPokemonType]',
})
export class PokemonTypeDirective {
  appPokemonType = input.required<PokemonType>();
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private readonly typeColors: Record<PokemonType, string> = {
    [PokemonType.WATER]: '#4592c4',
    [PokemonType.FIRE]: '#fd7d24',
    [PokemonType.GRASS]: '#9bcc50',
    [PokemonType.ELECTRIC]: '#eed535',
    [PokemonType.GHOST]: '#7b62a3',
    [PokemonType.PSYCHIC]: '#f366b9',
    [PokemonType.BUG]: '#f366b9',
    [PokemonType.DRAGON]: '#f366b9',
    [PokemonType.FIGHTING]: '#d56723',
    [PokemonType.DARK]: '#707070',
    [PokemonType.ROCK]: '#707070',
    [PokemonType.NORMAL]: '#a4acaf'
  };

  private readonly textColors: Record<PokemonType, string> = {
    [PokemonType.WATER]: '#ffffff',
    [PokemonType.FIRE]: '#ffffff',
    [PokemonType.GRASS]: '#000000',
    [PokemonType.ELECTRIC]: '#000000',
    [PokemonType.GHOST]: '#ffffff',
    [PokemonType.PSYCHIC]: '#ffffff',
    [PokemonType.BUG]: '#ffffff',
    [PokemonType.DRAGON]: '#ffffff',
    [PokemonType.FIGHTING]: '#ffffff',
    [PokemonType.DARK]: '#ffffff',
    [PokemonType.ROCK]: '#ffffff',
    [PokemonType.NORMAL]: '#000000'
  };

  constructor() {
    effect(() => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.typeColors[this.appPokemonType()] ?? '#a4acaf');
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.textColors[this.appPokemonType()] ?? '#000000');
        this.renderer.setStyle(this.elementRef.nativeElement, 'padding', '4px 12px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'border-radius', '5px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '12px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', 'bold');
        this.renderer.setStyle(this.elementRef.nativeElement, 'text-transform', 'uppercase');
        this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'inline-block');
      })
  }
}
