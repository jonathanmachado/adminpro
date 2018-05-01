import { UserService } from './../../services/user/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  imageUpload: File;
  imageTemp: string;

  constructor(public userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit() {}

  save(user: User) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user).subscribe();
  }

  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo no es una imagen', 'error');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }

  saveImage() {
    this.userService.updateImage(this.imageUpload, this.user._id);
  }
}
