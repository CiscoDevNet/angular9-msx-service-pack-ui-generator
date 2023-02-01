import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpxCommonModule} from '@cisco-msx/common';
import { MsxFormsModule } from '@cisco-msx/forms';
import { DevicesModule } from '@cisco-msx/devices';
import { SitesModule } from '@cisco-msx/sites';
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
		CommonModule,
		CpxCommonModule,
		MsxFormsModule,
		//SitesModule,
		//DevicesModule
	],
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	entryComponents: [DIRECTIVES]
})
export class @@base_component_name@@ServiceTilesModule implements DoBootstrap {
	/* eslint @typescript-eslint/no-empty-function: off */
	ngDoBootstrap(): void {}
}
