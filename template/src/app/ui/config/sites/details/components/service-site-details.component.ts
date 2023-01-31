import { Component, Input } from '@angular/core';
import template from './service-site-details.component.html';
import './service-site-details.component.scss';

@Component({
	selector: '@@servicepack_name@@-service-site-details',
	template
})

export class @@base_component_name@@ServiceSiteDetailsComponent {
	@Input() site: any;

	constructor( ) { }
}
