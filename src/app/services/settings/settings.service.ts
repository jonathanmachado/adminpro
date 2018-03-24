import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  settings: Settings = {
    theme: 'default',
    themeUrl: 'assets/css/colors/default.css'
  };

  constructor(
    @Inject(DOCUMENT) private _document,
  ) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      console.log('load value');
      this.settings = JSON.parse(localStorage.getItem('settings'));
    } else {
      console.log('value default');
    }
    this.setTheme(this.settings.theme);
  }

  setTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();
  }

}

interface Settings {
  theme: string;
  themeUrl: string;
}
