// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example device details tile implementation
import { Component, Input, OnInit, Inject } from '@angular/core';
import { AngularJSProvider } from '@msx/common';

const template = "<div class='' *ngIf='!deviceSerialAvailable'>" +
	"<span class='{{statusDot}}'></span>" +
	"<span msxResourceString='{{statusName}}' ></span>" +
	"<span class='sk-font-metadata-medium' msxResourceString='cisco.testtenantcenticservicepack.device.serial.no.missing'></span> " +
	"<a class='sk-font-standard-link' msxResourceString='Add Serial Number' role='link' tabindex='0' (click)='onclick()'></a>" +
	"</div>";

@Component({
	selector: '@@servicepack_name@@-device-details-tile0',
	providers: [
		new AngularJSProvider('skCommonStatusService')
	],
	template
})

export class @@base_component_name@@DeviceDetailsTile0 implements OnInit{
	// This is a reference to the device  
	@Input() device: any; 

	deviceSerialAvailable: boolean = false;
	statusDot: string = "";
	statusName: string = "";
	
	constructor(
		@Inject('skCommonStatusService') private statusService: any,
	) { }
	
	onclick() {
		console.log("Add Serial Number Clicked");
	}
	
	ngOnInit() {
		this.deviceSerialAvailable = this.device.serialKey && this.device.serialKey.length ? true : false;
		this.statusDot = this.statusService.getBubble(this.device.status.value);
		this.statusName = this.statusService.getText(this.device.status.value) + ": ";
	}
}