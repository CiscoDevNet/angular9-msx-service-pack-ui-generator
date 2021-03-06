// This is an example subscription manager, used to implement a subscribe and unsubscribe function.
// It demonstrates isolating the subscribe code into a helper class for easier maintenance.
export class @@base_component_name@@SubscripionManager {
	httpService: any;
	msxApiRouterBaseURL: string;
	
	constructor(httpService: any, msxApiRouterBaseURL: string) {
		this.httpService = httpService;
		this.msxApiRouterBaseURL = msxApiRouterBaseURL;
	}	
	
	buildSubscriptionRequest(servicesRouterUrl:string, offer:any, tenant:any){
		const serviceId = offer.productId || offer.serviceId;
		const serviceType = offer.serviceType;
		return {
			method: "POST",
			url: `${servicesRouterUrl}/manage/api/v8/services?offerId=${offer.id}&productId=${serviceId}`,
			data: {
				messageId: null,
				type: "request",
				action: "orderOffer",
				payload: {
					service: {
						id: serviceId ,
						version: "2.0",
						type: serviceType,
						orchestrator: "ncs",
						template: "ops-2.0.ftl",
						incomplete: "true"
					},
					tenant: {
						name: tenant.name,
						id: tenant.tenantId
					},
					offer: {
						id: offer.id,
						type: offer.name,
						name: offer.label
					},
					cost: {
						serviceTotal: null,
						serviceTotalType: "USD",
						deviceTotal: "0",
						deviceTotalType: "USD"
					},
					subscriptionDetail: {
						pricePlanId: offer.pricePlanId,
						serviceInstanceDetail: {},
						priceDetail: {}
					}
				}
			}
		};
	}

	// This is an example of a basic subscription function.  It takes the offer, the tenant, 
	// and any additional subscription data, and uses it to create the subscription and service instance
	// object within MSX.  This is a very simple one, but depending on what your service needs are, you may 
	// need to do more (call into your service APIs, sync over some data, and so on).
	subscribe(offer: any, tenant: any, additionalData: any){
		let resolve;
		let reject;
		
		const promise = new Promise(function(res, rej){
			resolve = res;
			reject = rej;
		});
		
		const req = this.buildSubscriptionRequest(this.msxApiRouterBaseURL, offer, tenant); 
		const httpService = this.httpService;
		
		const getContext = function(c){
			return c;
		};
		
		const apiContext = this.msxApiRouterBaseURL;
		
		// A super basic subscribe in MSX issues a command to the /manage/api/v1/services/ API with a payload as shown in the
		// buildSubscriptionRequest function.   This subscription function goes a bit further and that on success, it goes in and
		// sets the service lifecycle to 'Up', otherwise it would remain in ordering state until a back end call changed its state.		
		httpService(req).then(function(data) {
			if(data.data){
				const subInfo = data.data;
				const subId = subInfo.subscriptionId;
				
				// Now issue a request to get th newly created service instance.
				httpService({
					url: apiContext + "/manage/api/v2/serviceinstances/" + subId,
					method: "GET"
				}).then(function(resp){
					let d = resp.data;
					if(d && d.responseObject){
						let pl = d.responseObject;
						if(pl.status && pl.status.lifeCycleStatus){
							// We go the instance and info, lets put its state into 'Up' here.   You may need to
							// do other things with you service APIs to configure it before switching it to up.  That's
							// wholly dependant on how your specific service works.  Just that when you're done, it's a good
							// practicee to now set the service instance state to up.
							pl.status.lifeCycleStatus = "Up";
							httpService({
								url: apiContext + "/manage/api/v1/serviceinstances/" + subId,
								method: "PUT",
								headers: {
									"content-type": "application/json" 
								},
								data: JSON.stringify(pl)
							})["finally"](function(){
								resolve(true);
							});
						}else{
							resolve(true);
						}
					}else{
						resolve(true);
					}
				}, function(){
					resolve(true);
				});
			}else{
				resolve(true);
			}
		},function(error) {
			console["error"]("Subscription error: ", error);
			reject(error);
		});
		return promise;
	}
	
	unsubscribe(subscription: any){
		return this.httpService({
			url: this.msxApiRouterBaseURL + "/manage/api/v2/subscriptions/" + subscription.subscriptionId,
			method: "DELETE"
		});
	}
}