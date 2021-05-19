import { Component, Inject, Input } from '@angular/core';
import { @@base_component_name@@SubscripionManager } from '../../../../../manager/subscription-manager';
import { AngularJSProvider } from '@msx/common';
import template from './service-summary-tile.component.html';

@Component({
	selector: '@@servicepack_name@@-service-summary-tile',
	providers: [
		new AngularJSProvider('$state'),
		new AngularJSProvider('$http'),
		new AngularJSProvider('$localStorage')
	],	
	template
})

export class @@base_component_name@@ServiceSummaryComponent {
	subscriptionManager: any;
	@Input() service: any;
	deleting: boolean = false;

	constructor(
		@Inject('$state') private $state: any,
		@Inject('$http') private httpClient: any,
		@Inject('$localStorage') private $localStorage: any,
	) { 
		this.subscriptionManager = new @@base_component_name@@SubscripionManager(this.httpClient, this.$localStorage.API_GATEWAY_HOSTNAME);
	}

	onClick(): void {
		this.deleting = true;
		this.subscriptionManager.unsubscribe(this.service).finally(() => {
			this.$state.reload();
		});
	}
}
