// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the Tenant Centric Linkage file, used to register the Angular 9+ components
// into the tenant workspace.  It is a one-point place to to all the registration of your
// injectable components, control functions, and the like.

import { Injector } from "@angular/core";

import { @@base_component_name@@SubscriptionFormsModule } from "./config/subscription/subscription.module";
import { @@base_component_name@@PreSubscriptionForm } from "./config/subscription/pre/pre-subscription-form.component";
import { @@base_component_name@@SubscripionManager } from "./manager/subscription-manager";

import { @@base_component_name@@ServiceTilesModule } from "./config/services/service-tiles.module";
import { @@base_component_name@@ServiceSubtitleComponent } from "./config/services/components/tiles/service-subtitle-tile/service-subtitle-tile.component";
import { @@base_component_name@@ServiceSummaryComponent } from "./config/services/components/tiles/service-summary-tile/service-summary-tile.component";
import { @@base_component_name@@ServiceDetails } from "./config/services/components/tiles/service-details-tile/service-details-tile.component";
import { @@base_component_name@@DeviceProperties } from "./config/devices/summary/device-properties";
import { @@base_component_name@@DeviceActions } from "./config/devices/actions/device-actions";
import { @@base_component_name@@DeviceDetails } from "./config/devices/details/device-details";

import { @@base_component_name@@SiteDetails } from "./config/sites/details/site-details";

import { @@base_component_name@@ServiceNavigation } from "./config/navigation/service/service-navigation";

import { @@base_component_name@@ServiceConfigurationModule } from "./config/service_configuration/settings/settings.module";
import { @@base_component_name@@ServiceSettings } from "./config/service_configuration/settings/service-settings.component";

import { @@base_component_name@@OperatorExpandedTileModule } from "./config/operator/dashboard/tiles/expanded/expanded-tile.module";
import { @@base_component_name@@OperatorExpandedTileComponent } from "./config/operator/dashboard/tiles/expanded/expanded-tile.component";

export class @@base_component_name@@TCUIHooks {
    httpService: any;
    cpxSystemInfo: any;
    msxApiRouterBaseURL: string;
    subscriptionManager: any;
    baseRoute = "";
    injector: Injector = null;

    constructor(injector: Injector, baseRoute: string) {
        this.injector = injector;
        this.baseRoute = baseRoute;
        this.httpService = injector.get("cpx.core.http");
        this.cpxSystemInfo = injector.get("cpx.core.info");
        this.msxApiRouterBaseURL = this.cpxSystemInfo.getAPIGateway();
        this.subscriptionManager = new  @@base_component_name@@SubscripionManager(this.httpService, this.msxApiRouterBaseURL, injector);

        if (baseRoute) {
            this.baseRoute = baseRoute;
        }
    }


	getSubscriptionConfig() {
		return {
			// The component that is displayed before you are allowed to subscribe to the service.  It's
			// intended as a point to inject a small form, like a terms/conditions to agree to, or specific
			// required info needed, before you subscribe.  This component will pass the content along to the
			// subscription call as additional data.  We prrovide an example, but this is totally optional.
			// ** Optional.
			subscriptionFormComponent: {
				module: @@base_component_name@@SubscriptionFormsModule,
				component: @@base_component_name@@PreSubscriptionForm
			},

			// The function executed to subscribe to the service.  It should return a promise that resolves to true
			// when it is done.  A reject is treated as a failure.  This is provided as a sample implementation, your
			// service may require more.
			// ** Required.
			subscriptionFunction: (tenant:any, serviceType:string, offer:any, additionalData: any) => {
				return this.subscriptionManager.subscribe(offer, tenant, additionalData);
			}
		};
	}

	getOperatorDashboardConfig() {
		return {
			// The component that is displayed in the expanded view of a service tile in the operator dashboard.
			// This is optional, and if not provided, then it will just use the builtin default of the platform UI.
			// But, if this is provided, you can then do anything you want within that tile.
			// ** Optional.
			//
			// The format of this object is just returning the module and component that should be rendered when the
			// operator tile is expanded
			// {
			// 		module: @@base_component_name@@OperatorExpandedTileModule,
			//		component: @@base_component_name@@OperatorExpandedTileComponent
			// }
			//
			// Uncomment below if you need this
			/*
			operatorExpandedTileComponent: {
				module: @@base_component_name@@OperatorExpandedTileModule,
				component: @@base_component_name@@OperatorExpandedTileComponent
			}
			*/
		};
	}

	// This hook point allows us to pass on some navigational information into the MSX-UI's navigation
	// system for handling things like a 'service menu' that should go active when within a service's view
	// if the service asks for it to be.  It also allows hooking other menu items into the main level menu, if desired.
	//
	// ** optional
	//
	getNavigationConfig() {
		const ServiceMenuCtor = @@base_component_name@@ServiceNavigation;
		const snInst = new ServiceMenuCtor();
		return {
			getServiceMenu: () => {
				return snInst.getServiceMenu();
			},
			getNavigationAdditions: () =>  {
				return snInst.getNavigationAdditions();
			}
		}
	}

	getWorkspaceConfig() {
		return {
			services: {
				// The component that is displayed underneath your service name in your service instance
				// tile.  You need to pass both the containing Angular 9 module, and the component class.
				//
				// The component should define one input:
				//		service:  A javasceipt object containing the service instance details.
				//
				// ** optional
				//
				serviceSubtitleComponent: {
					module: @@base_component_name@@ServiceTilesModule,
					component: @@base_component_name@@ServiceSubtitleComponent
				},

				// The component that is displayed when your service instance tile is
				// collapsed in the Tenant Centric Workspace Services view.
				// You need to pass both the containing Angular 9 module, and the component class.
				//
				// The component should define one input:
				//		service:  A javasceipt object containing the service instance details.
				//
				// ** Required
				//
				serviceSummaryComponent: {
					module: @@base_component_name@@ServiceTilesModule,
					component: @@base_component_name@@ServiceSummaryComponent
				},

				// The component that is displayed when your service instance tile is
				// expanded in the Tenant Centric Workspace Services view.
				// You need to pass both the containing Angular 9 module, and the component class.
				//
				// The component should define one input:
				//		service:  A javasceipt object containing the service instance details.
				//
				// ** Required
				//
				serviceDetailsComponent: {
					module: @@base_component_name@@ServiceTilesModule,
					component: @@base_component_name@@ServiceDetails
				}
			},
			devices: {
				actions: {
					// The list of actions you want to display in the devices list for your devices.
					//
					// ** Optional
					//
					getDeviceActionsConfig: () => {
						const DeviceActionsPropCtor = @@base_component_name@@DeviceActions;
						const dpInst = new DeviceActionsPropCtor();
						return dpInst.getDeviceActionsConfig();
					}
				},
				summary: {
					// The list of properties you want to display in your device summary information for a device
					// associated to your service.  See the provided example implementation config file for details
					// on what is expected.
					//
					// ** Optional
					//
					getDevicePropertiesConfig: () => {
						const DevicePropCtor = @@base_component_name@@DeviceProperties;
						const dpInst = new DevicePropCtor();
						return dpInst.getDevicePropertiesConfig();
					}
				},
				details: {
					// The list of additional data panels you want to display in a device's details view.
					// The panels can be either in the side or main areas, and in top, middle, or bottom sections
					// of each one.
					//
					// ** Optional
					//
					getDevicePanels: () => {
						const DeviceDetailsCtor = @@base_component_name@@DeviceDetails;
						const dpInst = new DeviceDetailsCtor();
						if (dpInst.getDevicePanels){
							return dpInst.getDevicePanels();
						} else {
							return [];
						}
					},
					// The list of additional device actions to add to the toolbar in the device details view.
					//
					// ** Optional
					//
					getDeviceActions: () => {
						const DeviceDetailsCtor = @@base_component_name@@DeviceDetails;
						const dpInst = new DeviceDetailsCtor();
						if (dpInst.getDeviceActions){
							return dpInst.getDeviceActions();
						} else {
							return [];
						}
					},
					// The list of additional add device wizard steps to include into the add device wizard for your
					// service
					//
					// ** Optional
					//
					getAddDeviceWizardSteps: () => {
						const DeviceDetailsCtor = @@base_component_name@@DeviceDetails;
						const dpInst = new DeviceDetailsCtor();
						if (dpInst.getAddDeviceWizardSteps){
							return dpInst.getAddDeviceWizardSteps();
						} else {
							return [];
						}
					}
				}
			},
			sites: {
				details: {
					// The service detail panel to display regarding your site with the service.  It is optional.
					//
					// ** Optional
					//
					getSiteDetailsPanel: () => {
						const SiteDetailsCtor = @@base_component_name@@SiteDetails;
						const dpInst = new SiteDetailsCtor();
						if (dpInst.getSiteDetailsPanel){
							return dpInst.getSiteDetailsPanel();
						} else {
							return null;
						}
					},
					getSiteActions: () => {
						const SiteDetailsCtor = @@base_component_name@@SiteDetails;
						const dpInst = new SiteDetailsCtor();
						if (dpInst.getSiteActions){
							return dpInst.getSiteActions();
						} else {
							return null;
						}
					}
				}
			}
		};
	}

	getServiceControlsConfig() {
		//This JSON definitions are for Service controls.
		return {
			label: '@@servicepack_name@@.service.property.name',
			description: '@@servicepack_name@@.service.service.controls.description',
			controls: [
				{
					label: "@@servicepack_name@@.service.service.controls.templatemanagement",
					iconClass: "vms_fi_editor7040-24",
					description: "@@servicepack_name@@.service.service.controls.template.description",
					route: "app.template-workspace",
					stateParams: {
						obj: {
							label: "@@servicepack_name@@.service.service.controls.templatemanagement",
							backTo: 'app.service-controls',
							serviceType: '@@servicepack_name@@',
							tenantMode: true,
							disableImportTemplates: true,
							disableAssignTenants: true,
							columns: [{
								type : "string",
								name : "serviceConfigId",
								label :"@@servicepack_name@@.service.service.controls.config.column.label",
								className: "",
								order: 3,
								width: "25rem"
							},{
								type : "string",
								name : "assignedTenantName",
								label :"@@servicepack_name@@.service.service.controls.assigned.tenants.column.label",
								className: "",
								order: 4,
								width: "25rem"
							}]
						}
					}
				},
				{
					label: "@@servicepack_name@@.service.routed_page",
					iconClass: "vms_fi_editor7040-24",
					description: "@@servicepack_name@@.service.routed_page.description",
					route: "app.@@servicepack_name@@"
				}
			],
		};
	}

	getServiceConfigurationConfig() {
		// This set of options control what tiles appear for your service within
		// settings/service configuration/<your service>.   The enable setting denotes
		// if you should have the tile or not.   the 'settings' entry also supports
		// providing a component to display in a page.  This demonstrates how to do it,
		// you just need to populate the content of the view, or disable it if you don't
		// have one.
		return {
			"notifications": {
				"enabled": true
			},
			"terms": {
				"enabled": true
			},
			"settings" :{
				enabled: true,
				module: @@base_component_name@@ServiceConfigurationModule,
				component: @@base_component_name@@ServiceSettings
			}
		};
	}

	getGlobalActionsConfig() {
		// This set of options control what buttons appear the global menu add actions button.
		// It not provided, the default is they're supported.  It's an opt-out sort of configuration
		return {
			"add": {
				"site": true,
				"device": true
			}
		};
	}

}

export { @@base_component_name@@TCUIHooks as hooksClass };
