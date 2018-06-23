import { ModalUploadComponent } from './../components/modal-upload/modal-upload.component';
import { PipesModule } from './../pipes/pipes.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, PipesModule],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent
  ]
})
export class SharedModule {}
