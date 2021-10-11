// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example module file for containing device details tiles
// use within MSX.  It exports all the defined device details tiles
// so that MSX UI can instantiate them.

import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsxCommonModule} from '@msx/common';
import { @@base_component_name@@DeviceDetailsTile0 } from "./device-details-tile0.component";
import { @@base_component_name@@DeviceDetailsTile1 } from "./device-details-tile1.component";
import { @@base_component_name@@DeviceDetailsTile2 } from "./device-details-tile2.component";
import { @@base_component_name@@DeviceDetailsTile3 } from "./device-details-tile3.component";
import { @@base_component_name@@DeviceDetailsSideTile1 } from "./device-details-side-tile1.component";
import { @@base_component_name@@DeviceDetailsSideTile2 } from "./device-details-side-tile2.component";
import { @@base_component_name@@DeviceDetailsSideTile3 } from "./device-details-side-tile3.component";
import { MsxFormsModule } from '@msx/forms';
import { SitesModule } from '@msx/sites';
import { DevicesModule } from '@msx/devices';

const DIRECTIVES: Provider[] = [
	@@base_component_name@@DeviceDetailsTile0,
	@@base_component_name@@DeviceDetailsTile1,
	@@base_component_name@@DeviceDetailsTile2,
	@@base_component_name@@DeviceDetailsTile3,
	@@base_component_name@@DeviceDetailsSideTile1,
	@@base_component_name@@DeviceDetailsSideTile2,
	@@base_component_name@@DeviceDetailsSideTile3
];
@NgModule({
	imports: [
		CommonModule,
		MsxCommonModule,
		MsxFormsModule,
		SitesModule,
		DevicesModule
	],
	providers: [],
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	entryComponents: [DIRECTIVES]
})
export class @@base_component_name@@DeviceDetailsTilesModule implements DoBootstrap {
	/* eslint @typescript-eslint/no-empty-function: off */
	ngDoBootstrap(): void {}
}