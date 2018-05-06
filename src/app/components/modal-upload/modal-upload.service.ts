import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public type: string;
  public id: string;
  public hide: string = 'hide';
  public notification = new EventEmitter<any>();

  constructor() {
    console.log('listo');
  }

  showModal(type: string, id: string) {
    this.type = type;
    this.id = id;
    this.hide = '';
  }

  hideModal() {
    this.type = null;
    this.id = null;
    this.hide = 'hide';
  }
}
