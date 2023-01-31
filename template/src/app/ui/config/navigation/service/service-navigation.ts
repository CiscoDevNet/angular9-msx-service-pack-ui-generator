// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
//
// This is the linkage file to allow you to define specific navigation injections

export class @@base_component_name@@ServiceNavigation {
	constructor() {}
		
	getServiceMenu() {
		// This is an example, as service level navigation is not common in a true tenant centric
		// servicepack.  In this example I just return a menu entry that routes you back to the TCUI services
		// menu.  If you need a service menu, then you can just add entries into the items[] block below and it 
		// will act as the service's menu.
		//
		// format:
		//		{
		//			"label": "<Application title or I18N key>",
		//			"iconClass": "",
		//			"items": [{
		//				"label": "<First top level menu item title or I18N key>",
		//				"allow": "MANAGE_SERVICES <Optional.  This is a space separated list of roles that one must be assigned to the current user for the item to render>",
		//				"routeName": "some.route <Optional, this is the route associated with this menu item>",
		//				"routeUrl": "someUrl <Optional, this is the url associated with this menu item>",
		//				"broadcastEvent": "someEvent <Optional, an event to broadcast with the contents of this menu item.  Used to trigger special behaviors that just going to a state (routeName) or url won't handle>"
		//				"id": "some_id_0 <Optional, Some unique id to assign in the dom.  Good to set for test automation>",
		//				"iconClass": "slide-menu-icon some-icon-class"
		//				"items" : [ <Optional.  An array of more menu items to be sub-items of the main menu item.  These appear as either an accordion, or flyout, based on the menu mode config> ]
		//			},{
		//				"label": "<Second top level menu item title or I18N key>",
		//				"allow": ["MANAGE_SERVICES", "IS_ADMIN ORDER_SERVICES"] <You can also use arrays of space-separated roles to force that more than one role must be assigned before it will render.  At least one item in each entry in the array must be assigned for it to render>",
		//				"routeName": "some.route <Optional, this is the route associated with this menu item>",
		//				"routeUrl": "someUrl <Optional, this is the url associated with this menu item>",
		//				"broadcastEvent": "someEvent <Optional, an event to proadcase with the contents of this menu item.  Used to trigger special behaviors that just going to a state (routeName) or url won't handle>"
		//				"id": "some_id_1 <Optional, Some unique id to assign in the dom.  Good to set for test automation>",
		//				"iconClass": "slide-menu-icon some-icon-class"
		//				"items" : [ <Optional.  An array of more menu items to be sub-items of the main menu item.  These appear as either an accordion, or flyout, based on the menu mode config> ]
		//			},
		//			...
		//			]
		//		}
		//
		// **OPTIONAL**
		//
		return [{
			"label": "@@servicepack_name@@.service.property.name",
			"iconClass": "",
			"items": [{
				"label": "@@servicepack_name@@.menu.home.name",
				"routeName": "app.tenant_services",
				"routeUrl": "tenant_workspace/services",
				"id": "@@servicepack_name@@_home_link",
				"iconClass": "slide-menu-icon vms_fi_nav1001-16"
			}]
		}];
	}
	

	getNavigationAdditions() {
		// This is an example as to how to inject menu items into the lefthhand nav main navigation.  This
		// should not be a common thing, as tenant centric UI design has specific hook points defined for 
		// service content.  This is provided for th rare situation where you may want to inject a globally allowable
		// menu item.
		//
		// format:
		//		[{
		//			"label": "<First menu item title or I18N key>",
		//			"allow": "MANAGE_SERVICES <Optional.  This is a space separated list of roles that one must be assigned to the current user for the item to render>",
		//			"routeName": "some.route <Optional, this is the route associated with this menu item>",
		//			"routeUrl": "someUrl <Optional, this is the url associated with this menu item>",
		//			"broadcastEvent": "someEvent <Optional, an event to broadcast with the contents of this menu item.  Used to trigger special behaviors that just going to a state (routeName) or url won't handle>"
		//			"id": "some_id_0 <Optional, Some unique id to assign in the dom.  Good to set for test automation>",
		//			"iconClass": "slide-menu-icon some-icon-class"
		//			"items" : [ <Optional.  An array of more menu items to be sub-items of the main menu item.  These appear as either an accordion, or flyout, based on the menu mode config> ],
		//			"relativeTo": {	// Optional.  This indicates wher in the navigation to inject thm men item.  By default, it will append it to the end of the menu list, 
		//							// but with this you can specify relative to an existing menu item in the list.
		//				"menuItemId": "<some existing menu item ID>",
		//				"position": "before | after | child"
		//			}
		//		},{
		//			"label": "<Second menu item title or I18N key>",
		//			"allow": ["MANAGE_SERVICES", "IS_ADMIN ORDER_SERVICES"] <You can also use arrays of space-separated roles to force that more than one role must be assigned before it will render.  At least one item in each entry in the array must be assigned for it to render>",
		//			"routeName": "some.route <Optional, this is the route associated with this menu item>",
		//			"routeUrl": "someUrl <Optional, this is the url associated with this menu item>",
		//			"broadcastEvent": "someEvent <Optional, an event to proadcase with the contents of this menu item.  Used to trigger special behaviors that just going to a state (routeName) or url won't handle>"
		//			"id": "some_id_1 <Optional, Some unique id to assign in the dom.  Good to set for test automation>",
		//			"iconClass": "slide-menu-icon some-icon-class"
		//			"items" : [ <Optional.  An array of more menu items to be sub-items of the main menu item.  These appear as either an accordion, or flyout, based on the menu mode config> ]
		//			"relativeTo": {	// Optional.  This indicates wher in the navigation to inject thm men item.  By default, it will append it to the end of the menu list, 
		//							// but with this you can specify relative to an existing menu item in the list.
		//				"menuItemId": "<some existing menu item ID>",
		//				"position": "before | after | child" // Before meands before the item, affter means after, and child means make it a child of.
		//		},
		//		...
		//		]
		//
		// **OPTIONAL**
		//
		return [];
	}
}
		