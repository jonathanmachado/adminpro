import { Doctor } from './../../models/doctor.model';
import { URL_SERVICES } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable()
export class DoctorService {
  totalDoctors: number;

  constructor(public http: HttpClient, public userService: UserService) {}

  loadDoctors() {
    const url = URL_SERVICES + 'doctor';
    return this.http.get(url).map((response: any) => {
      console.log(response);
      this.totalDoctors = response.max;
      return response.doctors;
    });
  }

  loadDoctorById(id: string) {
    const url = URL_SERVICES + 'doctor/' + id;
    return this.http.get(url).map((response: any) => {
      return response.doctor;
    });
  }

  searchByCollection(search: string) {
    const url = URL_SERVICES + 'search/collection/doctors/' + search;
    return this.http.get(url).map((response: any) => response.doctors);
  }

  deleteDoctor(id: string) {
    const url =
      URL_SERVICES + 'doctor/' + id + '?token=' + this.userService.token;
    return this.http.delete(url).map((response: any) => {
      swal('Doctor borrado', 'Eliminado correctamente', 'success');
    });
  }

  saveDoctor(doctor: Doctor) {
    let url = URL_SERVICES + 'doctor';
    const token = '?token=' + this.userService.token;
    if (doctor._id) {
      url += '/' + doctor._id + token;
      return this.http
        .put(url, { name: doctor.name, hospital: doctor.hospital })
        .map((response: any) => {
          swal('Doctor Actualizado', doctor.name, 'success');
          return response.doctor;
        });
    } else {
      url += token;
      return this.http
        .post(url, { name: doctor.name, hospital: doctor.hospital })
        .map((response: any) => {
          swal('Doctor Creado', doctor.name, 'success');
          return response.doctor;
        });
    }
  }
}
