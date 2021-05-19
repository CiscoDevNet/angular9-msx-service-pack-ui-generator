// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example module file for containing device details tiles
// use within MSX.  It exports all the defined device details tiles
// so that MSX UI can instantiate them.

import { NgModule, Provider, DoBootstrap} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsxCommonModule} from '@msx/common';
import { MsxFormsModule } from '@msx/forms';
import { SitesModule } from '@msx/sites';
import { DevicesModule } from '@msx/devices';
import { BrowserModule } from '@angular/platform-browser';
import { @@base_component_name@@ServiceSettings } from "./service-settings.component";

const DIRECTIVES: Provider[] = [
	@@base_component_name@@ServiceSettings
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
	providers: [],
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	entryComponents: [DIRECTIVES]
})
export class @@base_component_name@@ServiceConfigurationModule implements DoBootstrap {
	/* eslint @typescript-eslint/no-empty-function: off */
	ngDoBootstrap(): void {}
}