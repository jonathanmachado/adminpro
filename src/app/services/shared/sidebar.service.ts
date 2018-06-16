import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [];
  constructor(public userService: UserService) {}

  loadMenu() {
    this.menu = this.userService.menu;
  }
}
