// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the linkage file to allow you to define device actions to display in dialogs launched
// from the device list actions menu.

import { @@base_component_name@@DeviceActionsModule } from "./device-actions.module";
import { @@base_component_name@@DeviceActionComponent0 } from "./components/device-action0.component";

export class @@base_component_name@@DeviceActions {
	constructor(){}
	
	// This function provides the device properties configuration
	// for the devices table summary view of a device.   Please note
	// that all labels should be i18n keys.  What is provided here is an example.
	//
	// Format:
	//	[
	//		{
	//			name: "<Some I18n Key for the name>",
	//			description: "<Some I18n Key for the action description>",
	//			module: <Some Angular 9 Module containing the action component"
	//			component: <The angular 9 action component>,
	//			deviceTypes: ["CISCO CSR 1000v", "CISCO ISR 1100", "CISCO ISR 3900", ...],
	//			bulkSupported: false
	//		},
	//		...
	//	]
	//
	getDeviceActionsConfig(){
		return 	[{
			name: "@@servicepack_name@@.service.devices.list.actions.action0.name",
			description: "@@servicepack_name@@.service.devices.list.actions.action0.description",
			module: @@base_component_name@@DeviceActionsModule,
			component: @@base_component_name@@DeviceActionComponent0,
			deviceTypes: ["CISCO CSR 1000v", "CISCO ISR 1100", "CISCO ISR 3900", "Cisco UCS 103", "Cisco ENC 5406"],
			bulkSupported: false
		}];
	}
}