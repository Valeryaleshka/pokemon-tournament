import { Routes } from '@angular/router';
import { Root } from './components/root/root';
import { PokemonService } from '@app/pages/pokemons/services/pokemon.service';

export const routes: Routes = [
  {
    path: '',
    component: Root,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pokemons/tournament',
      },
      {
        path: 'pokemons',
        providers: [PokemonService],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'tournament',
          },
          {
            path: 'tournament',
            title: 'Pokemons Tournament',
            loadComponent: () =>
              import('./pages/pokemons/pokemons-page.component').then((m) => m.PokemonsPage),
          },
          {
            path: ':id',
            title: 'Pokemon Info',
            loadComponent: () =>
              import('./pages/single-pokemon-stats/single-pokemon-stats').then(
                (m) => m.SinglePokemonStats,
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/pokemons/tournament',
  },
];
