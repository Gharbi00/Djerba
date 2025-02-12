import { Routes } from '@angular/router';
import { Error404Component } from './main/error404/error404.component';
import { AdminRoleGuard } from './admin/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'admin', canActivate: [AdminRoleGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: 'error404' },
];
