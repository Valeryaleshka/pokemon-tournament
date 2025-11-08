import { inject, Injectable } from '@angular/core';
import { PokemonProvider } from '@app/shared/providers/pokemon/pokemon.provider';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, of, switchMap } from 'rxjs';

@Injectable()
export class SinglePokemonStatsService {
  private readonly provider = inject(PokemonProvider);
  private pokemonIdSubject = new BehaviorSubject<number>(0);

  public pokemon = toSignal(
    this.pokemonIdSubject.pipe(
      switchMap(id => id ? this.provider.getPokemonFullData(id) : of(null))
    )
  );

  setPokemonId(id: number): void {
    console.log(id)
    this.pokemonIdSubject.next(id);
  }
}

