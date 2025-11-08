import { Component, inject, input, OnInit } from '@angular/core';
import { SinglePokemonStatsService } from './services/single-pokemon-stats.service';
import { JsonPipe } from '@angular/common';
import { PrettyJsonPipe } from '@app/shared/pipes/pretty-json';


@Component({
  selector: 'app-single-pokemon-stats',
  imports: [PrettyJsonPipe],
  templateUrl: './single-pokemon-stats.html',
  styleUrl: './single-pokemon-stats.less',
  providers: [SinglePokemonStatsService],
})
export class SinglePokemonStats implements OnInit {
  singlePokemon = inject(SinglePokemonStatsService);
  pokemonId = input.required<number>({ alias: 'id' });
  currentPokemon = this.singlePokemon.pokemon;

  ngOnInit() {
    this.singlePokemon.setPokemonId(Number(this.pokemonId()));
  }

  protected readonly JSON = JSON;
}
