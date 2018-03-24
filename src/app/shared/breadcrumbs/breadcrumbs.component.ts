import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    public router: Router,
    public title: Title,
    public meta: Meta
  ) {
    this.getDataRoute();
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .filter(event => event instanceof ActivationEnd)
      .filter((event: ActivationEnd) => event.snapshot.firstChild === null)
      .map((event: ActivationEnd) => event.snapshot.data)
      .subscribe((data: any) => {
        this.label = data.title;
        this.title.setTitle('AdminPro - ' + data.title);
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };
        this.meta.updateTag(metaTag);
      });
  }
}
