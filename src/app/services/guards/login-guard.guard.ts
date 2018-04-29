import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(private userServices: UserService, private router: Router) {}

  canActivate() {
    if (this.userServices.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
