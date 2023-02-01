// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the linkage file to allow you to define device properties to display within
// your devices in the denant centric devices summary.

export class @@base_component_name@@DeviceProperties {
	constructor(){}
	
	// This function provides the device properties configuration
	// for the devices table summary view of a device.   Please note
	// that all labels should be i18n keys.  What is provided here is an example.
	//
	// Format:
	//	[
	//		{
	//			label: "some.i18n.key0", (Required, the I18n label for the property)
	//			property: "deviceRootProp.someSubProperty.finalProp" (Required, the path location to the prioperty value, example: deviceAttributesDef.serialKey)
	//			valueFormatter: "string" | "number", | "ISO-8601-DATE" | "UNIXTimestamp"  (Optional, string/used difrectly is assumed if not provided)
	//		},
	//		...
	//	]
	//
	getDevicePropertiesConfig(){
		return 	[{
			label: "Device Name",
			property: "name",
			valueFormatter: "string"
		}, {
			label: "Software Version",
			property: "version",
			valueFormatter: "string"
		}, {
			label: "Serial Key",
			property: "serialKey",
			valueFormatter: "string"
		}, {
			label: "Last Status Update",
			property: "status.lastUpdated",
			valueFormatter: "ISO-8601-DATE"
		}, {
			label: "Last Status Message",
			property: "status.lastUpdatedMessage",
			valueFormatter: "string"
		}, {
			label: "Managed",
			property: "managed",
			valueFormatter: "string"
		}, {
			label: "Onboard Type",
			property: "onboardType",
			valueFormatter: "string"
		}, {
			label: "Created On",
			property: "createdOn",
			valueFormatter: "ISO-8601-DATE"
		}, {
			label: "Last Modified",
			property: "modifiedOn",
			valueFormatter: "ISO-8601-DATE"
		}];
	}
}