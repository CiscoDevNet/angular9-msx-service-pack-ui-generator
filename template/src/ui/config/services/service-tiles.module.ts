import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsxCommonModule, AngularJSProvider} from '@msx/common';
import { MsxFormsModule } from '@msx/forms';
import { DevicesModule } from '@msx/devices';
import { SitesModule } from '@msx/sites';
import { BrowserModule } from '@angular/platform-browser';
import { @@base_component_name@@ServiceDetails } from './components/tiles/service-details-tile/service-details-tile.component';
import { @@base_component_name@@ServiceSubtitleComponent } from './components/tiles/service-subtitle-tile/service-subtitle-tile.component';
import { @@base_component_name@@ServiceSummaryComponent } from './components/tiles/service-summary-tile/service-summary-tile.component';

const DIRECTIVES: Provider[] = [
	@@base_component_name@@ServiceDetails,
	@@base_component_name@@ServiceSubtitleComponent,
	@@base_component_name@@ServiceSummaryComponent
];
@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		MsxCommonModule,
		MsxFormsModule,
		SitesModule,
		DevicesModule
	],
	providers: [
		new AngularJSProvider('msx.translateService'),
		new AngularJSProvider('$state'),
		new AngularJSProvider('$http'),
		new AngularJSProvider('$localStorage')	
	],
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	entryComponents: [DIRECTIVES]
})
export class @@base_component_name@@ServiceTilesModule implements DoBootstrap {
	/* eslint @typescript-eslint/no-empty-function: off */
	ngDoBootstrap(): void {}
}
