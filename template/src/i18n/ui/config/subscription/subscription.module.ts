import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpxCommonModule } from '@cisco-msx/common';
import { MsxFormsModule} from '@cisco-msx/forms';

import { @@base_component_name@@PreSubscriptionForm } from './pre/pre-subscription-form.component';

const DIRECTIVES: Provider[] = [
	@@base_component_name@@PreSubscriptionForm,
];
@NgModule({
	imports: [
		CommonModule,
		CpxCommonModule,
		MsxFormsModule
	],
	providers: [
	],
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	entryComponents: [DIRECTIVES]
})
export class @@base_component_name@@SubscriptionFormsModule implements DoBootstrap {
	/* eslint @typescript-eslint/no-empty-function: off */
	ngDoBootstrap(): void {}
}