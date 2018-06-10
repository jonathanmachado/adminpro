import { Hospital } from './../../models/hospital.model';
import { UserService } from './../user/user.service';
import { URL_SERVICES } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HospitalService {
  totalHospitals: number = 0;

  constructor(public http: HttpClient, public userService: UserService) {}

  loadHospitals() {
    const url = URL_SERVICES + 'hospital';
    return this.http.get(url).map((response: any) => {
      this.totalHospitals = response.max;
      return response.hospitals;
    });
  }

  getHospital(id: string) {
    const url = URL_SERVICES + 'hospital/' + id;
    return this.http.get(url).map((response: any) => {
      return response.hospital;
    });
  }

  deleteHospital(id: string) {
    const url =
      URL_SERVICES + 'hospital/' + id + '?token=' + this.userService.token;
    return this.http.delete(url).map((response: any) => {
      swal('Hospital borrado', 'Eliminado correctamente', 'success');
    });
  }

  createHospital(name: string) {
    const url = URL_SERVICES + 'hospital/?token=' + this.userService.token;
    return this.http.post(url, { name }).map((response: any) => {
      return response.hospital;
    });
  }

  searchByCollection(search: string) {
    const url = URL_SERVICES + 'search/collection/hospitals/' + search;
    return this.http.get(url).map((response: any) => response.hospitals);
  }

  updateHospital(hospital: Hospital) {
    const url =
      URL_SERVICES +
      'hospital/' +
      hospital._id +
      '?token=' +
      this.userService.token;
    return this.http.put(url, hospital).map((response: any) => {
      swal('Hospital Actualizado', hospital.name, 'success');
      return response.hospital;
    });
  }
}
