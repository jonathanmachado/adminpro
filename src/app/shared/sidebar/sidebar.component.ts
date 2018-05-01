import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from './../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: User;

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }
}
