import { UploadFileService } from './../uploadFile/upload-file.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  user: User;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public uploadFileService: UploadFileService
  ) {
    this.setStorage();
  }

  createUser(user: User) {
    const url = URL_SERVICES + 'users';
    return this.http
      .post(url, user)
      .map((response: any) => {
        swal('El usuario ha sido creado', user.email, 'success');
        return response.user;
      })
      .catch(error => {
        swal(error.error.message, error.error.errors.message, 'error');
        return Observable.throw(error);
      });
  }

  updateUser(user: User) {
    let url = URL_SERVICES + 'users/' + user._id;
    url += '?token=' + this.token;
    return this.http
      .put(url, user)
      .map((response: any) => {
        if (user._id === this.user._id) {
          this.user = response.user;
          this.saveStorage(this.user._id, this.token, this.user, response.menu);
        }
        swal('Datos actualizados', user.name, 'success');
        return true;
      })
      .catch(error => {
        swal(error.error.message, error.error.errors.message, 'error');
        return Observable.throw(error);
      });
  }

  updateImage(file: File, id: string) {
    this.uploadFileService
      .uploadFile(file, 'users', id)
      .then((response: any) => {
        this.user.img = response.user.img;
        swal('Imágen actualizada', this.user.name, 'success');
        this.saveStorage(id, this.token, response.user, response.menu);
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  login(user: User, remember: boolean = false) {
    const url = URL_SERVICES + 'login';

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http
      .post(url, user)
      .map((response: any) => {
        // localStorage.setItem('id', response.id);
        // localStorage.setItem('token', response.token);
        // localStorage.setItem('user', JSON.stringify(response.user));
        this.saveStorage(
          response.id,
          response.token,
          response.user,
          response.menu
        );

        return true;
      })
      .catch(error => {
        swal('Error en el login', error.error.message, 'error');
        return Observable.throw(error);
      });
  }

  logout() {
    this.token = '';
    this.user = null;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.token.length > 5 ? true : false;
  }

  setStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + 'login/google';

    return this.http.post(url, { token }).map((response: any) => {
      this.saveStorage(
        response.id,
        response.token,
        response.user,
        response.menu
      );
      return true;
    });
  }

  loadUsers(offset: number = 0) {
    const url = URL_SERVICES + 'users?offset=' + offset;
    return this.http.get(url);
  }

  searchByCollection(search: string) {
    const url = URL_SERVICES + 'search/collection/users/' + search;
    return this.http.get(url).map((response: any) => response.users);
  }

  deleteUser(id: string) {
    const url = URL_SERVICES + 'users/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }
}
