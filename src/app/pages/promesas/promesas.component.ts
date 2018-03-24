import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.counterSeconds().then(
      () => console.log(true)
    )
    .catch(error => console.log(false, error));
  }

  ngOnInit() {
  }

  counterSeconds(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;
        if (counter === 3) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  }

}
