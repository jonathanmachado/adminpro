import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  @Input() data: any;
  @Input() labels: any;
  @Input() chartType: string;
  @Input() leyenda: string;


  constructor() { }

  ngOnInit() {
  }

}
