import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Futures} from "./futures";
import {Series} from "./series";


@Injectable({providedIn: 'root'})
export class FuturesService
{
    private _data: BehaviorSubject<Series[]> = new BehaviorSubject(null);

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
    get data$(): Observable<Series[]>
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
        return this._httpClient.get('api/series').pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }

    getFromFuturesStore(): Observable<Futures> {
      return this._httpClient.get('api/futures').pipe(
        map(() =>
        {
          return new Futures()
        }),
      );
    }

  /**
   * Get data
   */
  setData(data): Observable<Series[]>
  {
   this._data.next(data);
    return this._data.asObservable();

  }

  /**
   * ChangeSeries
   * This method just create new item into Futures Array
   */
  saveItem(mItem):Observable<Series[]> {
    return this._httpClient.put('api/series', mItem).pipe(
      tap((response: Series[]) =>
      {
        this._data.next(response);
      }),
    );
  }

  /**
   * ChangeSeries
   * This method upgrading series array
   */
  saveSeries(array):Observable<Series[]> {
    return this._httpClient.post('api/series', array).pipe(
      tap((response: Series[]) =>
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
