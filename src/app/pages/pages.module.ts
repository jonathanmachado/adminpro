import { GraficaDonaComponent } from './../components/grafica-dona/grafica-dona.component';
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})

export class PagesModule { }
