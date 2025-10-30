import {inject, Injectable, signal} from '@angular/core';
import {PokemonProvider} from '../providers/pokemon.provider';
import {combineLatest, Observable, Subject, takeUntil} from 'rxjs';
import {generateUniquePokemonIds} from '../../../shared/helpers/pokemon.helper';

@Injectable()
export class PokemonService {
  provider = inject(PokemonProvider);

  public pokemons = signal<any[]>([]);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  private destroy$ = new Subject<void>();

  private generateObservables(ids: number[]): Observable<any>[] {
    return ids.map(id => this.provider.getPokemons(id));
  }

  public initPokemons(numberOfPokemons: number): void {
    this.destroy$.next();

    this.loading.set(true);
    this.error.set(null);

    combineLatest(this.generateObservables(generateUniquePokemonIds(numberOfPokemons)))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (pokemonData) => {
          console.log(pokemonData)
          this.loading.set(false);
          this.pokemons.set(pokemonData);
        },
        error: (error) => {
          this.loading.set(false);
          this.error.set('Failed to load pokemons');
          console.error('Error loading pokemons:', error);
        }
      });
  }
}
