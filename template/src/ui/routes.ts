import type { Ng2StateDeclaration } from '@uirouter/angular';

export const routes: Ng2StateDeclaration[] = [
  {
    name: 'app.@@servicepack_name@@.**',
    url: '/@@servicepack_name@@',
    loadChildren: () =>
      import('./routed-page').then(mod => mod.RoutedPageModule),
  },
];
