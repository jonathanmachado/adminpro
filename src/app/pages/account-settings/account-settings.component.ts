import { SettingsService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.putCheck();
  }

  changeTheme(theme: string, link: any) {
    this.setCheck(link);
    this.settingsService.setTheme(theme);
  }

  setCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  putCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this.settingsService.settings.theme;

    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
