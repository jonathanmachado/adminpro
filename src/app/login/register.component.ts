import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  customForm: FormGroup;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    init_plugins();

    this.customForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        repassword: new FormControl(null, Validators.required),
        conditions: new FormControl(false)
      },
      {
        validators: this.sameValues('password', 'repassword')
      }
    );

    this.customForm.setValue({
      name: 'test ',
      email: 'test@test.com',
      password: '123456',
      repassword: '123456',
      conditions: true
    });
  }

  sameValues(field1: string, field2: string) {
    return (group: FormGroup) => {
      const value1 = group.controls[field1].value;
      const value2 = group.controls[field2].value;

      if (value1 === value2) {
        return null;
      }

      return {
        sameValues: true
      };
    };
  }

  registrationUser() {
    if (this.customForm.invalid) {
      return;
    }

    if (!this.customForm.value.conditions) {
      swal('Importante', 'Debe de seleccionar las condiciones', 'warning');

      return;
    }

    const user = new User(
      this.customForm.value.name,
      this.customForm.value.email,
      this.customForm.value.password
    );

    this.userService
      .createUser(user)
      .subscribe(response => this.router.navigate(['/login']));
  }
}
