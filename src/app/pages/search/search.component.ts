import { Hospital } from './../../models/hospital.model';
import { Doctor } from './../../models/doctor.model';
import { URL_SERVICES } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      const search = params['search'];
      this.search(search);
    });
  }

  ngOnInit() {}

  search(search: string) {
    const url = URL_SERVICES + 'search/all/' + search;
    this.http.get(url).subscribe((response: any) => {
      this.users = response.users;
      this.doctors = response.doctors;
      this.hospitals = response.hospitals;
    });
  }
}
