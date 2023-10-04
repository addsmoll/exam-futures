import {CommonModule, CurrencyPipe, DecimalPipe, NgClass, NgFor, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {ApexOptions, NgApexchartsModule} from 'ng-apexcharts';
import {
  map,

  mergeMap,

  of,

  Subject, takeUntil,
  tap,
  timer
} from 'rxjs';
import {FuturesService} from "./futures.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Router} from "@angular/router";
import {IRange} from "./range.interface";
import {IResultSeries, ISeries} from "./series.interface";
import {ResultSeries, Series} from "./series";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";

import {MaxPipe, MinPipe} from "./min-max.pipe";

@Component({
    selector       : 'app-futures',
    templateUrl    : './futures.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, MatMenuModule, MatButtonToggleModule, NgApexchartsModule, MatTooltipModule, NgFor, DecimalPipe, MinPipe, MaxPipe],

})
export class FuturesComponent implements OnInit, OnDestroy
{

  public resultSeries: IResultSeries;
  percentOfChange: number;
  trend: 'up' | 'down' = 'down';
  currentSeries: ISeries;
  allSeries: ISeries[] = [];
  seriesRange = [
    { label:'5 min', value: 1 },
    { label:'15 min', value: 3 },
    { label:'1 h ', value: 12 },
    { label:'2 h ', value: 24 },
    { label:'4 h ', value: 48 }
  ]
  currentSeriesRange: IRange = this.seriesRange[0]
  timer5Sec = timer(1000, 1000); //  timer5Sec = timer(1000, 5000);
  timer5Min = timer(0, 5000); //  timer5Min = timer(1000, 300000);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _futuresService: FuturesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,

    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.currentSeries = new Series(99);
      this.resultSeries = new ResultSeries();

      // Get the data
      this._futuresService.data$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data) =>
        {
          // Store the data
          this.allSeries = data;
        });

      // Launch generation futures with static 5s interval.
      this.timer5Sec
        .pipe(
          mergeMap(() => {
           return this._futuresService.getFromFuturesStore() //We were taking new future object
          }),
          tap((newFutures) => {
            console.log('resultSeries', this.resultSeries);
            if (this.resultSeries?.min){
              if (newFutures.value < this.resultSeries?.min) {
                this.resultSeries.min = newFutures.value
                this.currentSeries.min = newFutures.value
              }
            }else {
              this.resultSeries.min = newFutures.value;
            }
                  if (newFutures.value > this.resultSeries?.max) {
                    this.resultSeries.max = newFutures.value
                    this.currentSeries.max = newFutures.value
                  }
                  this.currentSeries.values.push(newFutures);
                  this._changeDetectorRef.markForCheck()
                  return this._futuresService.saveItem(this.currentSeries)

          })
        )
        .subscribe(data => {


        })

      //Launch and create first series object in db.
      this.timer5Min
        .pipe(
        mergeMap(() => {
          this.currentSeries = new Series(this.currentSeries.series+1)
          let newArr = [...this.allSeries, this.currentSeries]
          return this._futuresService.saveSeries(newArr);
        }),
          ).subscribe((data) => {
            this.calculateResultSeries(data)
        this._changeDetectorRef.markForCheck()

      })

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

  /**
   *
   * Saving min & max value of each item in common arr
   * @param arr
   */
  calculateResultSeries(arr): any
  {
    const sum = this.currentSeries.series-this.currentSeriesRange.value;
    const commonArr = []
    arr.forEach((e) => {
      if(e.series >= sum) {
        commonArr.push(e.max)
        commonArr.push(e.min)
      }
    })

      this.resultSeries.min = Math.min(...commonArr);
      this.resultSeries.max = Math.max(...commonArr);



  }





  saveNewObject() {


  }

  /**
   * On Series Range Change
   * @param value
   */
  onSeriesRangeChange(value) {
    this.currentSeriesRange = value
  }


}
