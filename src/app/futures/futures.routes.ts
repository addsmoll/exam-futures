import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {FuturesComponent} from "./futures.component";
import {FuturesService} from "./futures.service";


export default [
    {
        path     : '',
        component: FuturesComponent,
        resolve  : {
            data: () => inject(FuturesService).getData(),
        },
    },
] as Routes;
