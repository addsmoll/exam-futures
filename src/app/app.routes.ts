import { Route } from '@angular/router';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

     {
       path: '', loadChildren: () => import('./futures/futures.routes'),

    },

];
