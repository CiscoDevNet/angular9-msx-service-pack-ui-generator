// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the linkage file to allow you to define site details configuration to display within
// your devices in the tenant centric device details screen.

import { @@base_component_name@@SiteDetailsTilesModule } from "./components/site-details-tiles.module";
import { @@base_component_name@@ServiceSiteDetailsComponent } from "./components/service-site-details.component";


export class @@base_component_name@@SiteDetails {
	constructor(){}
	
	// This function provides the site details configuration
	// for the service details of a specific site.  
	//
	// Format:
	//	{
	//		component: theComponent,
	//		module: theModule
	//	}
	//
	getSiteDetailsPanel(){	
		return 	{
			component: @@base_component_name@@ServiceSiteDetailsComponent,
			module: @@base_component_name@@SiteDetailsTilesModule
		}
	}
	// This function provides any site actions you want to attach to the site actions bar.  These can launch/do anything
	// you wish them to do.  In this example, theey're just calling console.log, but you could launch your own dialogs, run it 
	// against the site, whatever it is you need to do.
	//
	// Format:
	//	[
	//		{
	//			label: "cisco.common.button.ok",   // The tooltip/label for the button.
	//			iconClass: "vms_fi_chat17006-16",  // Button icon class.
	//			buttonClass: "button--secondary",  // Button type.
	//			handler: function (site) {
	//				// DO SOMETHING!
	//			}
	//		}
	//		...
	//	]
	getSiteActions() {
		return [{
			label: "cisco.common.button.ok",
			iconClass: "vms_fi_chat17006-16",
			buttonClass: "button--secondary",
			handler: function (site) {
				console.log("Site ok clicked.", site);
			}
		},{
			label: "cisco.common.button.refresh",
			iconClass: "vms_fi_alert6020-16",
			buttonClass: "button--secondary",
			handler: function () {
				// This is an example, not ideal, just an example
				// of doing something in a handler.  In this case it dynamically
				// grabs the UI's root injector and uses it to fire a refresh event.
				const angular = window["angular"];
				const $ = angular.element;
				const injector = $("body").injector();
				if(injector){
					try{
						const alertService = injector.get("msx.alertService");
						const $rootScope = injector.get("$rootScope");
						$rootScope["$broadcast"]("msx-refresh-site-details");
						alertService["success"]({
							'message': "Refresh Clicked!",
							'title': "cisco.common.alert.title",
						});
					}catch(ex){}
				}
			}
		}];
	}
}