import {CommonModule, CurrencyPipe, DecimalPipe, NgClass, NgFor, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,  ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import {
  concatMap,
  delay,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  range,
  Subject,
  switchMap,
  take,
  takeUntil, tap,
  timer
} from 'rxjs';
import {FuturesService} from "./futures.service";
import { DateTime } from 'luxon';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Router} from "@angular/router";
import {IRange} from "./range.interface";
import {IFutures} from "./futures.interface";
import {Futures} from "./futures";

@Component({
    selector       : 'app-futures',
    templateUrl    : './futures.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, MatMenuModule, MatButtonToggleModule, NgApexchartsModule, MatTooltipModule, NgFor, DecimalPipe],

})
export class FuturesComponent implements OnInit, OnDestroy
{
  percentOfChange: number;
  trend: 'up' | 'down' = 'down';
  currentSeriesValue: number = 97;
  currentSeries: IRange =  { label:'5 min', value: 99 }
  currentFutures: IFutures;
  allFutures: IFutures[] = [];
  currentFuturesValue: number;
  seriesRange: [
    { label:'5 min', value: 1 },
    { label:'15 min', value: 3 },
    { label:'1 h ', value: 12 },
    { label:'2 h ', value: 24 },
    { label:'4 h ', value: 48 }
  ]
  timer: number;
  timer5Sec = timer(1000, 1000); //  timer5Sec = timer(1000, 5000);
  timer5Min = timer(1000, 5000); //  timer5Min = timer(1000, 300000);

  private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private _futuresService: FuturesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

      // this.timer5Sec
      //   .pipe(
      //     mergeMap(() => {
      //      return this._futuresService.getData()
      //     })
      //   )
      //   .subscribe(val => {
      //
      //
      // })

      this.timer5Min
        .pipe(
        mergeMap(() => {
          let newArr = [...this.allFutures, new Futures(this.currentSeriesValue+1)]
          if(this.allFutures.length > 30){
            newArr = [new Futures(this.currentSeriesValue+1)]
          }
          return this._futuresService.saveNewArr(newArr);

        }),
        ).subscribe(() => {
          this.currentSeriesValue = this.currentSeriesValue+1
      })

        // Get the data
        this._futuresService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
              this.allFutures = data;
              this.currentFutures = data.find(f => f.series === this.currentSeriesValue)
              console.log('cf', this.currentFutures);
            });
    }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any
  {
    return item.id || index;
  }


  compareFuturesBySeries(series: number) {
   return of(this.currentFutures.series === series)
  }

  saveNewObject() {


  }

  /**
   * On Series Range Change
   * @param value
   * @private
   */
  onSeriesRangeChange(value) {
    this.currentSeriesValue = value


    this.compareFuturesBySeries(this.currentSeriesValue)
    return of(true)
  }








}
