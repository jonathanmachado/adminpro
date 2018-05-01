import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SharedService,
  SidebarService,
  SettingsService,
  UserService,
  LoginGuardGuard,
  UploadFileService
} from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    UserService,
    SettingsService,
    SharedService,
    SidebarService,
    LoginGuardGuard,
    UploadFileService
  ]
})
export class ServiceModule {}
