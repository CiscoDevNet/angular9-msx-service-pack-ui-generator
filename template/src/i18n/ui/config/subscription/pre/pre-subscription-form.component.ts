// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.
import { Component, EventEmitter, Input, Output, HostBinding, SimpleChanges} from '@angular/core';
 
import template from './pre-subscription-form.component.html';
import './pre-subscription-form.component.scss';
  
@Component({
    selector: 'pre-service-subscription-form',
    template
})
 
// A very basic form component with input/output emitters.
export class @@base_component_name@@PreSubscriptionForm{
	@HostBinding('class') class = '@@servicepack_name@@-subscription-form'; 

    @Input() tenant: any;
    @Input() service: any;
    @Input() offer: any;
 
    @Output() isvalid: EventEmitter<any> = new EventEmitter();
    @Output() onchange: EventEmitter<any> = new EventEmitter();
    @Output() oncustomsubscriptionmessages: EventEmitter<any> = new EventEmitter();
     
    acceptTerms: boolean = false;
    acceptSupport: boolean = false;
     
    _onChange($event, field): void {
    	if (field === "acceptTerms"){
	    	this.acceptTerms = $event.$value;
    	}
    	if (field === "acceptSupport"){
	    	this.acceptSupport = $event.$value;
    	}
        this.isvalid.emit(this.acceptTerms && this.acceptSupport);
		this.onchange.emit({
			acceptTerms: this.acceptTerms,
			acceptSupport: this.acceptSupport
		});

        // ${productName} or ${serviceName} will be substituted with the product primary name.
        // ${offerName} or ${variantName} will be substituted with the variant/offer selected from the product
        if(this.oncustomsubscriptionmessages){
        	/* Disabled for now.
            this.oncustomsubscriptionmessages.emit([
                "some.i18n.key.0",
                "some.i18n.key.1"
            ]);
            */
        }
    }
}