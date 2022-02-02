import { NgModule } from '@angular/core';

import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'modules',
        loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
