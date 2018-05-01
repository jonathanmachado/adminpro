import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

import { NgZone } from '@angular/core';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  remember: boolean = false;
  email: string;
  auth2: any;

  constructor(
    public router: Router,
    public userService: UserService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.remember = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '839677494171-8violo45s598vs49gpiggcglia9euiik.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;
      this.zone.run(() => {
        this.userService
          .loginGoogle(token)
          .subscribe(response => this.router.navigate(['/dashboard']));
      });
    });
  }

  ingresar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const user = new User(null, f.value.email, f.value.password);

    this.userService
      .login(user, f.value.remember)
      .subscribe(response => this.router.navigate(['/dashboard']));
  }
}
