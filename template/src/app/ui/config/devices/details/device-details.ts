// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the linkage file to allow you to define device details configuration to display within
// your devices in the tenant centric device details screen.

import { @@base_component_name@@DeviceDetailsTilesModule } from "./components/device-details-tiles.module";
import { @@base_component_name@@DeviceDetailsTile0 } from "./components/device-details-tile0.component";
import { @@base_component_name@@DeviceDetailsTile1 } from "./components/device-details-tile1.component";
import { @@base_component_name@@DeviceDetailsTile2 } from "./components/device-details-tile2.component";
import { @@base_component_name@@DeviceDetailsTile3 } from "./components/device-details-tile3.component";
import { @@base_component_name@@DeviceDetailsSideTile1 } from "./components/device-details-side-tile1.component";
import { @@base_component_name@@DeviceDetailsSideTile2 } from "./components/device-details-side-tile2.component";
import { @@base_component_name@@DeviceDetailsSideTile3 } from "./components/device-details-side-tile3.component";

export class @@base_component_name@@DeviceDetails {
	constructor(){}
	
	// This function provides the device details configuration
	// for the device details of a specific device.  
	//
	// Format:
	//	[
	//		{
	//			panel: {
	//				module <The implementing module>,
	//				component: <The implementing Component>
	//			},
	//			position: "status", // The location in the screen where the tile goes, can be of value: 'status', top, middle, bottom.
	//								// Note:  status is only a valid location for section main.
	//			section: "main" // The screen section the tile should to in.  Can be contain values "main" or "side"
	//		},
	//		...
	//	]
	//
	getDevicePanels(){	
		return 	[{
			panel: {
				component: @@base_component_name@@DeviceDetailsTile0,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },
			position: "status",
			section: "main"
		},{
			panel: {
				component: @@base_component_name@@DeviceDetailsTile1,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },		
			position: "top",
			section: "main"
		},{
			panel: {
				component: @@base_component_name@@DeviceDetailsTile2,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },		
			position: "middle",
			section: "main"
		}, {
			panel: {
				component: @@base_component_name@@DeviceDetailsTile3,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },		
			position: "bottom",
			section: "main"
		},{
			panel: {
				component: @@base_component_name@@DeviceDetailsSideTile1,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },		
			position: "top",
			section: "side"
		},{
			panel: {
				component: @@base_component_name@@DeviceDetailsSideTile2,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },		
			position: "middle",
			section: "side"
		},{
			panel: {
				component: @@base_component_name@@DeviceDetailsSideTile3,
				module: @@base_component_name@@DeviceDetailsTilesModule
            },		
			position: "bottom",
			section: "side"
		}];
	}
	
	// This function provides any device actions you want to attach to the device actions bar.  These can launch/do anything
	// you wish them to do.  In this example, theey're just calling console.log, but you could launch your own dialogs, run it 
	// against the device, whatever it is you need to do.
	//
	// Format:
	//	[
	//		{
	//			label: "cisco.common.button.ok",   // The tooltip/label for the button.
	//			iconClass: "vms_fi_chat17006-16",  // Button icon class.
	//			buttonClass: "button--secondary",  // Button type.
	//			handler: function (device) {
	//				const p = new Promise();
	//				// DO SOMETHING!
	//				p.resolve(true);
	//				return p;
	//			}
	//		}
	//		...
	//	]
	getDeviceActions() {
		return [{
			commonType: "DELETE",
			handler: function(device){
				let resolve;
				const p = new Promise(function(res, rej){resolve = res});
				console.log("I clicked delete!");
				resolve(true);
				return p;
			}
		},{
			label: "cisco.common.button.ok",
			iconClass: "vms_fi_chat17006-16",
			buttonClass: "button--secondary",
			handler: function (device) {
				let resolve;
				const p = new Promise(function(res, rej){resolve = res});
				console.log("I clicked okay!");
				resolve(true);
				return p;
			}
		}]
	}
	// This function provides any device add wizard steps you want to inject into your add device flow.
	//
	// Format:
	//	[
	//		{
	//			title: "Device Information", 			// Wizard title, should be an i18n key.
	//			description: "TTC Service: Basic information required for adding a device.", // Wizard description, should be an i18n key.
	//			optional: false, 						// Boolean flag to indicate if the step is optional.
	//			key: "ttc_service_device_info",  		// The identification key for the wizard
	//			component: TcuiAddDeviceInfoComponent,  // The Angular 9 component that implements the wizard view
	//			componentData: deviceStepsData,		 	// Any data to pass into the component.
	//			module: TcuiWizardsModule 				// The module that contains the component.
	//		}
	//		...
	//	]	
	getAddDeviceWizardSteps() {
		return [];
	}
}