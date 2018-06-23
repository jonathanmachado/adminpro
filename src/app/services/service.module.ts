import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from './../components/modal-upload/modal-upload.service';

import {
  SharedService,
  SidebarService,
  SettingsService,
  UserService,
  LoginGuardGuard,
  AdminGuard,
  UploadFileService,
  HospitalService,
  DoctorService,
  ReloadTokenGuard
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
    AdminGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    ReloadTokenGuard
  ]
})
export class ServiceModule {}
