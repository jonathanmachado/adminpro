import { ModalUploadService } from './modal-upload.service';
import { UploadFileService } from './../../services/uploadFile/upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imageUpload: File;
  imageTemp: string;

  constructor(
    private uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

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

  closeModal() {
    this.imageUpload = null;
    this.imageTemp = null;
    this.modalUploadService.hideModal();
  }

  saveImage() {
    this.uploadFileService
      .uploadFile(
        this.imageUpload,
        this.modalUploadService.type,
        this.modalUploadService.id
      )
      .then(response => {
        this.modalUploadService.notification.emit(response);
        this.closeModal();
      })
      .catch(error => {
        console.log(error);
      });
  }
}
