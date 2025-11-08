import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, retry, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from '../../types/pokemon.types';
import { map } from 'rxjs/operators';
import { PokemonApiResponse } from '@app/shared/providers/pokemon/pokemon.provider.types';

@Injectable({
  providedIn: 'root'
})
export class PokemonProvider {
  private readonly http = inject(HttpClient);
  private readonly apiCache = new Map<number, Observable<PokemonApiResponse>>();

  public getSinglePokemon(id: number): Observable<IPokemon | null> {

    return this.gerRequest(id)
      .pipe(map((data) => {


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
      .pipe(catchError(error => {
        console.log(error)

        return of(null);
      }))

  }

  public getPokemonFullData(id: number): Observable<PokemonApiResponse> {
    return this.gerRequest(id);
  }

  private gerRequest(id: number): Observable<PokemonApiResponse>{
    const cached = this.apiCache.get(id);
    if (cached) {
      return cached;
    }

    const $request = this.http.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(retry(2))
      .pipe(shareReplay(1));

    this.apiCache.set(id, $request);

    return $request;
  }
}
