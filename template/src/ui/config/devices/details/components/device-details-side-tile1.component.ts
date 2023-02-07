// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example device details tile implementation
import { Component, Input, OnInit, Inject} from '@angular/core';

const template = "<div class='sk-font-panel-header' msxResourceString='TOP Section'></div>" +
	"<div style='padding: 1rem'>" +
		"<div class='sk-font-panel-subheader' msxResourceString='Located in the TOP section of the side section'></div>" +
		"<br>" +
		"<div class='sk-font-standard-text' msxResourceString='Device Name: ${name}' [msxResourceStringSubstitutions]='device'></div>" +
	"</div>";

@Component({
	selector: '@@servicepack_name@@-device-details-side-tile1',
	template
})

export class @@base_component_name@@DeviceDetailsSideTile1 implements OnInit {
	// This is a reference to the device  
	@Input() device: any; 

	constructor( ) { }
	
	ngOnInit() { }
}