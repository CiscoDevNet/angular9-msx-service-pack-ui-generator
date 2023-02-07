import { NgModule,  } from '@angular/core';
import { CpxCommonModule } from "@cisco-msx/common";
import { RoutedPageComponent } from './routed-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CpxCommonModule,
    RouterModule.forChild([
        {
          path: '@@servicepack_name@@',
          component:RoutedPageComponent
        }
    ])
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
