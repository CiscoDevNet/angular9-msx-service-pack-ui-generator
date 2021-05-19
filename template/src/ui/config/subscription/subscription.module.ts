import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsxCommonModule, AngularJSProvider} from '@msx/common';
import { MsxFormsModule} from '@msx/forms';
import { BrowserModule } from '@angular/platform-browser';

import { @@base_component_name@@PreSubscriptionForm } from './pre/pre-subscription-form.component';

const DIRECTIVES: Provider[] = [
	@@base_component_name@@PreSubscriptionForm,
];
@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		MsxCommonModule,
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