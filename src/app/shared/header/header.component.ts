import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

  search(search: string) {
    this.router.navigate(['/search', search]);
  }
}
