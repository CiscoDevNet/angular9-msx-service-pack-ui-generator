// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is an example action implementation file for device actions for
// use within MSX.  This simple example just appears with an 'ok' button
// but implementors could do many other things within this component definition.
import { Component, Input } from '@angular/core';
import template from './device-action0.component.html';
@Component({
	selector: '@@servicepack_name@@-service-site-details',
	template
})

export class @@base_component_name@@DeviceActionComponent0 {
	// This is a reference to the modal dialog container.  
	// Generally you just use it to close the dialog.
	@Input() modal: any; 
	//This is all the data being sent into the dialog.  In this case
	// it contains the data about the device.
	@Input() resolve: any;
	constructor( ) { }
	cancel() {
		if(this.modal){
			this.modal.close();
		}
	}
}
