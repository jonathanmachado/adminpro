import { DoctorService } from './../../services/doctor/doctor.service';
import { Doctor } from './../../models/doctor.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(public doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.loadDoctors().subscribe(result => {
      this.doctors = result;
    });
  }

  searchDoctors(search: string) {
    if (search.length <= 0) {
      this.loadDoctors();
    }
    this.doctorService.searchByCollection(search).subscribe(result => {
      this.doctors = result;
    });
  }

  deleteDoctor(doctor: Doctor) {
    this.doctorService.deleteDoctor(doctor._id).subscribe(() => this.loadDoctors());
  }
}
