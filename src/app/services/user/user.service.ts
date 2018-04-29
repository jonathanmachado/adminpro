import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log(true);
    this.setStorage();
  }

  createUser(user: User) {
    const url = URL_SERVICES + 'users';
    return this.http.post(url, user).map((response: any) => {
      swal('El usuario ha sido creado', user.email, 'success');
      return response.user;
    });
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  login(user: User, remember: boolean = false) {
    const url = URL_SERVICES + 'login';

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, user).map((response: any) => {
      // localStorage.setItem('id', response.id);
      // localStorage.setItem('token', response.token);
      // localStorage.setItem('user', JSON.stringify(response.user));
      this.saveStorage(response.id, response.token, response.user);

      return true;
    });
  }

  logout() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.token.length > 5 ? true : false;
  }

  setStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + 'login/google';

    return this.http.post(url, { token }).map((response: any) => {
      this.saveStorage(response.id, response.token, response.user);
      return true;
    });
  }
}
