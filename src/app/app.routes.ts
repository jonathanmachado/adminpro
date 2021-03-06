import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';

const appRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NopagefoundComponent
  }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
