import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPokemon, PokemonType} from '../types/pokemon.types';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonProvider {
  http = inject(HttpClient);

  public getSinglePokemon(id: number): Observable<IPokemon> {
    return this.http.get<PokermonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(map((data) => {
      return {
        id: data.id,
        name: data.name,
        type: data.types[0]?.type.name || 'unknown',
        baseExperience: data.baseExperience || 0,
        imageUrl: data.sprites.frontDefault,
        wins: 0,
        losses: 0,
        ties: 0,
        winrate: 0,
      }
    }))
  }
}

export interface PokermonApiResponse {
  baseExperience: number;
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
}

export interface Sprites {
  frontDefault: string;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface Species {
  name: PokemonType;
  url: string;
}
