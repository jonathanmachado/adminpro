import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate() {
    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
