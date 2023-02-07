import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import template from './expanded-tile.component.html';
import './expanded-tile.component.scss';

@Component({
	selector: '@@servicepack_name@@operator-dashboard-expanded-tile-service',
	host: {'class': '@@servicepack_name@@-operator-dashboard-expanded-tile-service'},
	template
})
export class @@base_component_name@@OperatorExpandedTileComponent implements OnInit, OnDestroy {

	// The tile data to display about the service.  This will be passed in.
	@Input() tile: any = null;

	// Service metadata about the service/product in our DB.
	@Input() serviceMetadata: any = null;

	// Input that's passed in to indicate if the show expanded link should be displayed, or not.
	@Input() showExpanded = false;

	// Class to attach to the description.   Also passed in
	@Input() descriptionStyle = "";

	// Labels shown in the UI code.
	viewLessLabel = "cisco.common.tenant.dashboard.sites.overview.siteInfo.viewless";
	viewMoreLabel = "cisco.common.tenant.dashboard.sites.overview.siteInfo.viewmore";

	// Variables to show expanded description/details/info.
	isExpanded = false;

	text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non metus rutrum, iaculis justo et, tristique arcu." +
			"Quisque dictum, nibh non euismod ultricies, odio tortor pulvinar tellus, quis porttitor felis elit eu massa. Orci varius natoque " +
			"penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse efficitur ante a sem venenatis, et cursus ligula fringilla. " +
			"Proin lobortis tristique ex, id ultricies tellus ornare a. Ut ullamcorper, diam eleifend maximus elementum, libero nibh elementum elit, a " +
			"bibendum mauris nunc imperdiet mi. Nunc pellentesque vitae libero a convallis. Maecenas dapibus, dolor non iaculis elementum, odio erat egestas " +
			"neque, imperdiet blandit arcu justo non purus. Praesent id lectus eget metus ullamcorper vehicula. Donec lorem enim, placerat porttitor sagittis " +
			"ut, ultrices vitae sapien. Fusce et varius velit, et sollicitudin tortor. Morbi et est enim. Vivamus at justo sapien. Praesent vitae erat et leo " +
			"mattis tincidunt.";

	constructor(
	) {
		// Anything you might need to do in the constructor
	}

	ngOnInit() {
		// Anything you might need to do in init
	}

	ngOnDestroy() {
		// Anything you may need to do in cleanup/destroy
	}

	// Functions used by the small tile view to show or hide more or less text.
	viewFullText() {
		this.descriptionStyle = "msx-service-desc-text-container-large";
		this.isExpanded = true;
	}

	viewLessText() {
		this.descriptionStyle = "msx-service-desc-text-container";
		this.isExpanded = false;
	}
}
