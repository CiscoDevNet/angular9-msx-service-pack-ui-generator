import { Component, Inject, Input, Injector} from '@angular/core';
import { @@base_component_name@@SubscripionManager } from '../../../../../manager/subscription-manager';
import template from './service-summary-tile.component.html';

@Component({
	selector: '@@servicepack_name@@-service-summary-tile',
	template
})

export class @@base_component_name@@ServiceSummaryComponent {
	subscriptionManager: any;
	@Input() service: any;
	deleting: boolean = false;

	constructor(
		@Inject('cpx.core.http') private httpClient: any,
        @Inject('cpx.core.info') private cpxSystemInfo: any,
        private readonly injector: Injector
	) {
		this.subscriptionManager = new @@base_component_name@@SubscripionManager(this.httpClient, this.cpxSystemInfo.getAPIGateway(), injector);
	}

	onClick(): void {
		this.deleting = true;
		this.subscriptionManager.unsubscribe(this.service).finally(() => {
			window.location.reload();
		});
	}
}
