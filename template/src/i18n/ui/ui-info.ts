// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the UI information file to provide build details to the platform.
// It is used to populate component versions, as well as define a way to put a cache breaker
// on the file load.

export class @@base_component_name@@UIInfo {
	buildDate: string;
	buildVersion: string;
	servicepackName: string;
	buildNumber: string;
	versionId: string;

	constructor() {
		this.buildDate = "__UI_BUILDDATE__";
		this.buildVersion = "__BUILD_VERSION__";
		this.servicepackName = "__SERVICE_PACK_NAME__";
		this.buildNumber = "__BUILD_NUMBER__";
		this.versionId = "__BUILD_VERSION_ID__";
	}
}
export { @@base_component_name@@UIInfo as infoClass };