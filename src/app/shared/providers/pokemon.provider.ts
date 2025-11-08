import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPokemon, PokemonType } from '../types/pokemon.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonProvider {
  private readonly http = inject(HttpClient);

  public getSinglePokemon(id: number): Observable<IPokemon> {
    return this.http.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(map((data) => {
      return {
        id: data.id,
        name: data.name,
        type: data.types[0]?.type.name ?? 'unknown',
        baseExperience: data.baseExperience ?? 0,
        imageUrl: data.sprites.frontDefault,
        wins: 0,
        losses: 0,
        ties: 0,
        winrate: 0,
      }
    }))
  }
}

export interface PokemonApiResponse {
  baseExperience: number;
  id: number;
  name: string;
  sprites: Sprites;
  types: IResponsePokemonType[];
}

export interface Sprites {
  frontDefault: string;
}

export interface IResponsePokemonType {
  slot: number;
  type: IPokemonSpecies;
}

export interface IPokemonSpecies {
  name: PokemonType;
  url: string;
}
