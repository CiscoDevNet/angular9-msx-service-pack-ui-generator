// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example device details tile implementation
import { Component, Input, OnInit } from '@angular/core';

const template = "<div class='sk-font-panel-header' msxResourceString='BOTTOM PANEL'></div>" +
	"<div style='padding: 1rem'>" +
		"<div class='sk-font-panel-subheader' msxResourceString='Located in the BOTTOM section of the additional panels config.  You can have 0 to many panels in the bottom section.'></div>" +
		"<br>" +
		"<div class='sk-font-standard-text' msxResourceString='Device Name: ${name}' [msxResourceStringSubstitutions]='device'></div>" +
	"</div>";

@Component({
	selector: '@@servicepack_name@@-device-details-tile3',
	template
})

export class @@base_component_name@@DeviceDetailsTile3 implements OnInit{
	// This is a reference to the device  
	@Input() device: any; 

	constructor( ) { }
	
	ngOnInit() { }
}