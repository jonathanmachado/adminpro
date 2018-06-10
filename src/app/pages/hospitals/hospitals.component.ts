import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { HospitalService } from './../../services/hospital/hospital.service';
import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  totalHospitals: number = 0;
  hospitals: Hospital[] = [];

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadHospitals();

    this.modalUploadService.notification.subscribe(() => {
      this.loadHospitals();
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe(response => {
      this.totalHospitals = this.hospitalService.totalHospitals;
      this.hospitals = response;
    });
  }

  searchHospital(search: string) {
    if (search.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.hospitalService
      .searchByCollection(search)
      .subscribe((response: any) => {
        this.hospitals = response;
      });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospitals', id);
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe();
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService
      .deleteHospital(hospital._id)
      .subscribe(() => this.loadHospitals());
  }

  createHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((value: string) => {
      if (!value || value.length === 0) {
        return;
      }

      this.hospitalService.createHospital(value).subscribe(() => {
        this.loadHospitals();
      });
    });
  }
}
