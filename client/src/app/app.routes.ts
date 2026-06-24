import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/carta/carta.component').then(m => m.CartaComponent),
  },
  {
    path: 'reservas',
    loadComponent: () => import('./features/reservas/reservas.component').then(m => m.ReservasComponent),
  },
  { path: '**', redirectTo: '' },
];
