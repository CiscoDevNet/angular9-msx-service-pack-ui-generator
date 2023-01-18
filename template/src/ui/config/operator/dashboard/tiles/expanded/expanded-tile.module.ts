import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsxCommonModule, AngularJSProvider} from '@cisco-msx/common';
import { MsxFormsModule } from '@cisco-msx/forms';
import { DevicesModule } from '@cisco-msx/devices';
import { SitesModule } from '@cisco-msx/sites';
import { @@base_component_name@@ExpandedTileComponent } from './expanded-tile.component';

const DIRECTIVES: Provider[] = [
	@@base_component_name@@OperatorExpandedTileComponent
];
@NgModule({
	imports: [
		CommonModule,
		MsxCommonModule,
		MsxFormsModule,
		SitesModule,
		DevicesModule
	],
	providers: [
		new AngularJSProvider('msx.translateService'),
	],
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	entryComponents: [DIRECTIVES]
})
export class @@base_component_name@@ExpandedTileModule implements DoBootstrap {
	/* eslint @typescript-eslint/no-empty-function: off */
	ngDoBootstrap(): void {}
}