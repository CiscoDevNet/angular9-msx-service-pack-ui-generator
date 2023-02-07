
export const  routes: any [] = [
  {
    path: '@@servicepack_name@@',
    loadChildren: () =>
      import('./routed-page').then(mod => mod.RoutedPageModule),
  },
];
