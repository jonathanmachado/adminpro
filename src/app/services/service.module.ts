import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SharedService,
  SidebarService,
  SettingsService,
  UserService,
  LoginGuardGuard
} from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    UserService,
    SettingsService,
    SharedService,
    SidebarService,
    LoginGuardGuard
  ]
})
export class ServiceModule {}
