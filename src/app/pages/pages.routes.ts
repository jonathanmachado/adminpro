import { SearchComponent } from './search/search.component';
import { DoctorComponent } from './doctors/doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import {
  LoginGuardGuard,
  AdminGuard,
  ReloadTokenGuard
} from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ReloadTokenGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: {
      title: 'Account Settings'
    }
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: {
      title: 'Hospitals'
    }
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: {
      title: 'doctors'
    }
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: {
      title: 'doctor'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: {
      title: 'Users'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'search/:search',
    component: SearchComponent,
    data: {
      title: 'Buscador'
    }
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {
      title: 'Progress Bars'
    }
  },
  {
    path: 'graficas1',
    component: Graficas1Component,
    data: {
      title: 'Gráficas'
    }
  },
  {
    path: 'promesas',
    component: PromesasComponent,
    data: {
      title: 'Promesas'
    }
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: {
      title: 'RxJs'
    }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
