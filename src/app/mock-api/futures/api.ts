import { Injectable } from '@angular/core';
import { futures as futuresData } from './data';
import { cloneDeep } from 'lodash-es';
import {MockApiService} from '../mock-api.service';

@Injectable({providedIn: 'root'})
export class FuturesMockApi
{
    private _futures: any = futuresData;

    /**
     * Constructor
     */
    constructor(private _mockApiService: MockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onGet('api/futures')
            .reply(() => [200, cloneDeep(this._futures)]);
    }
}
