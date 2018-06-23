import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BoundCallbackObservable } from 'rxjs/observable/BoundCallbackObservable';

@Injectable()
export class ReloadTokenGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiredBoolean: boolean = this.expired(payload.exp);
    if (expiredBoolean) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.checkReload(payload.exp);
  }

  checkReload(endDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(endDate * 1000);
      const now = new Date();

      now.setTime(now.getTime() + 1 * 60 * 60 * 1000);

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.userService.reloadToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/login']);
            reject(false);
          }
        );
      }
    });
  }

  expired(endDate: number): boolean {
    const now = new Date().getTime() / 1000;
    return endDate < now;
  }
}
