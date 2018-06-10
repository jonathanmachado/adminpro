import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from './../../models/doctor.model';
import { HospitalService } from './../../services/hospital/hospital.service';
import { DoctorService } from './../../services/doctor/doctor.service';
import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');

  doctor: Doctor = new Doctor('', '', '', '', '');

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'new') {
        this.loadDoctorById(id);
      }
    });
  }

  ngOnInit() {
    this.loadHospitals();
    this.modalUploadService.notification.subscribe((response: any) => {
      this.doctor.img = response.doctor.img;
    });
  }

  loadHospitals() {
    this.hospitalService
      .loadHospitals()
      .subscribe(response => (this.hospitals = response));
  }

  loadDoctorById(id: string) {
    this.doctorService.loadDoctorById(id).subscribe((doctor: any) => {
      this.doctor = doctor;
      this.doctor.hospital = doctor.hospital._id;
      this.changeHospital(this.doctor.hospital);
    });
  }

  saveDoctor(f: NgForm) {
    if (f.invalid) {
      return;
    } else {
      this.doctorService.saveDoctor(this.doctor).subscribe((doctor: Doctor) => {
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
      });
    }
    console.log(f.valid, f.value);
  }

  changeHospital(id: string) {
    this.hospitalService
      .getHospital(id)
      .subscribe(hospital => (this.hospital = hospital));
  }

  changeImage() {
    this.modalUploadService.showModal('doctors', this.doctor._id);
  }
}
