import { Routes } from '@angular/router';
import { Root } from './components/root/root';

export const routes: Routes = [
  {
    path: '',
    component: Root,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/pokemons' },
      {
        path: 'pokemons',
        pathMatch: 'full',
        title: 'Pokemons Tournament',
        loadComponent: () =>
          import('./pages/pokemons/pokemons-page.component').then(
            (m) => m.PokemonsPage,
          ),
      },
      {
        path: 'pokemons/:id',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/single-pokemon-stats/single-pokemon-stats').then(
            (m) => m.SinglePokemonStats,
          ),

      },
    ],
  }, {
    path: '**', redirectTo: '/pokemons'
  }
];
