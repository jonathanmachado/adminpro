import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() percentage: number = 50;

  @Output() onChangeValue: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtPorcentage') txtPorcentage: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  changeValue(value: any) {

    if (this.percentage >= 100 && value > 0) {
      this.percentage = 100;
      return;
    }

    if (this.percentage <= 0 && value < 0) {
      this.percentage = 0;
      return;
    }

    this.percentage = this.percentage + value;
    this.txtPorcentage.nativeElement.value = this.percentage;

    this.onChangeValue.emit(this.percentage);

    this.txtPorcentage.nativeElement.focus();
  }

  onChanges(newValue: number) {

    if (newValue >= 100) {
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }


    this.onChangeValue.emit(this.percentage);

  }
}
