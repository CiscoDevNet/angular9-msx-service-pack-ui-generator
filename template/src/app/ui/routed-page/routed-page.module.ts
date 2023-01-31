import { NgModule } from '@angular/core';
import { MsxCommonModule } from "@cisco-msx/common";
import { RoutedPageComponent } from './routed-page.component';
import { UIRouterModule } from '@uirouter/angular';

@NgModule({
  imports: [
    MsxCommonModule,
    UIRouterModule.forChild({
      states: [
        {
          name: 'app.@@servicepack_name@@',
          url: '/@@servicepack_name@@',
          views: {
            'module@app': {
              component: RoutedPageComponent
            }
          },
        }
      ]
    })
  ],
  declarations: [
    RoutedPageComponent,
  ],
  entryComponents: [
    RoutedPageComponent,
  ]
})
export class RoutedPageModule {
}
