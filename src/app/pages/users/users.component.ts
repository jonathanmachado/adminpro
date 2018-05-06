import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { UserService } from './../../services/service.index';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[];
  offset: number = 0;
  totalRegister: number = 0;
  loadingUsers: boolean = true;

  constructor(
    private userService: UserService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadUsers();

    this.modalUploadService.notification.subscribe(response => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.loadingUsers = true;
    this.userService.loadUsers(this.offset).subscribe((response: any) => {
      this.totalRegister = response.max;
      this.users = response.users;
      this.loadingUsers = false;
    });
  }

  changeOffset(offset: number) {
    const offsetResult = this.offset + offset;
    if (offsetResult >= this.totalRegister) {
      return;
    }

    if (offsetResult < 0) {
      return;
    }

    this.offset = offsetResult;
    this.loadUsers();
  }

  searchUser(search: string) {
    if (search.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loadingUsers = true;
    this.userService.searchByCollection(search).subscribe((users: User[]) => {
      this.users = users;
      this.loadingUsers = false;
    });
  }

  deleteUser(user: User) {
    if (user._id === this.userService.user._id) {
      swal('Error', 'No te puedes eliminar a ti mismo', 'error');
      return;
    }

    swal({
      title: 'Está seguro',
      text: 'Está a punto de borrar ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.userService.deleteUser(user._id).subscribe(() => {
          swal('Usuario ' + user.name + ' usuario borrado correctamente', {
            icon: 'success'
          });
          this.loadUsers();
        });
      }
    });
  }

  saveUser(user: User) {
    this.userService.updateUser(user).subscribe(() => {});
  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }
}
