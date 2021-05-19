import { Component, Inject, Input, OnInit} from '@angular/core';
import { @@base_component_name@@SubscripionManager } from '../../../../../manager/subscription-manager';
import { AngularJSProvider } from '@msx/common';
import template from './service-details-tile.component.html';
import './service-details-tile.component.scss';

@Component({
	selector: '@@servicepack_name@@-service-details',
	host: {'class': '@@servicepack_name@@-service-details'},
	providers: [
		new AngularJSProvider('$state'),
		new AngularJSProvider('$http'),
		new AngularJSProvider('$localStorage'),
		new AngularJSProvider('msx.platform.servicePanelControls'),
		new AngularJSProvider('msx.platform.helpService')
	],	
	template
})

export class @@base_component_name@@ServiceDetails implements OnInit {
	subscriptionManager: any;
	@Input() service: any;
	deleting: boolean = false;
	text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non metus rutrum, iaculis justo et, tristique arcu." +
			"Quisque dictum, nibh non euismod ultricies, odio tortor pulvinar tellus, quis porttitor felis elit eu massa. Orci varius natoque " +
			"penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse efficitur ante a sem venenatis, et cursus ligula fringilla. " +
			"Proin lobortis tristique ex, id ultricies tellus ornare a. Ut ullamcorper, diam eleifend maximus elementum, libero nibh elementum elit, a " +
			"bibendum mauris nunc imperdiet mi. Nunc pellentesque vitae libero a convallis. Maecenas dapibus, dolor non iaculis elementum, odio erat egestas " +
			"neque, imperdiet blandit arcu justo non purus. Praesent id lectus eget metus ullamcorper vehicula. Donec lorem enim, placerat porttitor sagittis " +
			"ut, ultrices vitae sapien. Fusce et varius velit, et sollicitudin tortor. Morbi et est enim. Vivamus at justo sapien. Praesent vitae erat et leo " +
			"mattis tincidunt.";

	constructor(
		@Inject('$state') private $state: any,
		@Inject('$http') private httpClient: any,
		@Inject('$localStorage') private $localStorage: any,
		@Inject('msx.platform.servicePanelControls') private servicePanelControls: any,
		@Inject('msx.platform.helpService') private helpService: any
	) { 
		this.subscriptionManager = new @@base_component_name@@SubscripionManager(this.httpClient, this.$localStorage.API_GATEWAY_HOSTNAME);
	}
	
	ngOnInit() {
		const helpService = this.helpService;
		
		// This registers buttons to appear when in details view.  Note that all labels
		// should be I18n keys and defined within your I18n file.  This is just an example
		// of how to define and display them.
		
		this.servicePanelControls.registerServicePanelControls("@@servicepack_name@@", [{
			label: "@@servicepack_name@@.service.tile.help.button.label",
			buttonClass: "vms_fi_alert6005-16 button--secondary",
			action: function(){
				helpService.launchHelp("msx/platform/tenant/workspace/@@servicepack_name@@/help");
			}		
		},{
			label: "Button 1",
			buttonClass: "vms_fi_action2007-16 button--secondary",
			action: function(){
				console.log("Executed action 1");
			}
		},{
			label: "Button 2",
			buttonClass: "vms_fi_action2010-16 button--primary",
			action: function(){
				console.log("Executed action 2");
			}
		},{
			label: "Button 3",
			buttonClass: "vms_fi_action2013-16 button--danger",
			action: function(){
				console.log("Executed action 3");
			}
		}, {
			label: "Button 4",
			iconClass: "vms_fi_settings3001-16",
			buttonClass: "button--primary",
			menuItems: [{
				label: "Menu Item 0",
				value: "Something"
			},{
				label: "Menu Item 1",
				value: "Something"
			},{
				label: "Menu Item 2",
				value: "Something"
			},{
				label: "Menu Item 3",
				value: "Something"
			},{
				label: "@@servicepack_name@@.service.tile.help.button.label",
				value: {
					launchHelp: function(){
						helpService.launchHelp("msx/platform/tenant/workspace/@@servicepack_name@@/help");
					}
				}
			}],
			action: function(thing){
				console["log"]("Menu Item clicked! ", thing);
				if(thing && thing.value && thing.value.launchHelp){
					thing.value.launchHelp();
				}
			}
		},{
			label: "Switch",
			type: "toggle",
			tooltip: "This is a switch",
			tooltipOn: "The switch is on",
			tooltipOff: "The switch is off",
			offIcon: "VMS_FI_ALERT6014-16",
			onIcon: "VMS_FI_COLLAB16003-16",
			action: function(onState){
				console.log("Executed switch.  State:", onState);
			}
		}]);		
	}

	onClick(): void {
		this.deleting = true;
		this.subscriptionManager.unsubscribe(this.service).finally(() => {
			this.$state.reload();
		});
	}
}
