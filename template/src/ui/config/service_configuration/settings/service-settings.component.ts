// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example service stettings tile for settings/Service Configuration/YourService implementation
import { Component, Input, OnInit } from '@angular/core';
import { MsxCommonModule } from '@cisco-msx/common';
import template from './service-settings.component.html';

@Component({
	selector: '@@servicepack_name@@-configuration-service-settings',
	host: {
		"class": "vms-standard-view"
	},
	template
})

export class @@base_component_name@@ServiceSettings implements OnInit {
	constructor() { }
	
	ngOnInit() { 
	}
}