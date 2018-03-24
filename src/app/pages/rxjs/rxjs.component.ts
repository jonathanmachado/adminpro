import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor() {



    this.subs = this.returnObserver()
      .subscribe(
        numero => console.log(numero),
        error => console.error(error),
        () => console.log('Finish')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  returnObserver(): Observable<any> {
    return new Observable( observer => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;

        const returnObject = {
          value: counter
        };

        observer.next(returnObject);

        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
        // } else if (counter === 2) {
        //   observer.error('error');
        // }
      }, 500);

    })
    .map((value: any) => value.value)
    .filter(value => value % 2 !== 0)
    .retry(2);
  }

}
