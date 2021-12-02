import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import { AngularJSProvider } from '@cisco-msx/common';
import template from './service-subtitle-tile.component.html';

@Component({
	selector: '@@servicepack_name@@-service-subtitle-tile',
	providers: [
		new AngularJSProvider('msx.translateService')
	],
	template
})

export class @@base_component_name@@ServiceSubtitleComponent {
	@Input() service: any;

	_msg: string = '';

	constructor(
		@Inject('msx.translateService') private translateService: any
	) { }

	ngOnInit(): void {
		if(this.service){
			const dateStamp = this.service.modifiedOn || this.service.createdOn || 0;
			const date = new Date();
			date.setTime(dateStamp);
			this._msg = this.translateService("@@servicepack_name@@.service.last.updated.label", {
				date: new Date()
			});
		}
	}

	ngOnChanges(changes: SimpleChanges) {
        const { service } = changes;

        if (service && service.currentValue) {
            const dateStamp = service.currentValue.modifiedOn || service.currentValue.createdOn || 0;
				const date = new Date();
				date.setTime(dateStamp);
				this._msg = this.translateService("@@servicepack_name@@.service.last.updated.label", {
					date: new Date()
				});
        }
    }
}
