import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {Futures} from "./futures";

@Injectable({providedIn: 'root'})
export class FuturesService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        return this._httpClient.get('api/futures').pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }

  /**
   * Get data
   */
  setData(data): Observable<any>
  {
   this._data.next(data);
    return this._data.asObservable();

  }

  /**
   * ChangeSeries
   * This method just create new item into Futures Array
   */
  changeSeries(rangeValue: number) {
    return this._httpClient.post('api/futures', JSON.stringify(new Futures(rangeValue))).pipe(
      tap((response: any) =>
      {
        this._data.next(response);
      }),
    );
  }

  /**
   * ChangeSeries
   * This method upgrading futures array
   */
  saveNewArr(array) {
    return this._httpClient.post('api/futures', array).pipe(
      tap((response: any) =>
      {
        this._data.next(response);
      }),
    );
  }



  /**
   * Generates a random id
   *
   * @param length
   */
  randomNumber(length: number = 10): string
  {
    const chars = '0123456789';
    let name = '';

    for ( let i = 0; i < length; i++ )
    {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }
}
