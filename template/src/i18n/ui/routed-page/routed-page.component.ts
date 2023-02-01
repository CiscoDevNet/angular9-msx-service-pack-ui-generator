import { Component, OnInit } from '@angular/core';
import template from './routed-page.component.html';

@Component({
  selector: '@@servicepack_name@@-routed-page',
  host: {
    class: 'vms-standard-view'
  },
  template
})
export class RoutedPageComponent implements OnInit {
	ngOnInit() {}
}
