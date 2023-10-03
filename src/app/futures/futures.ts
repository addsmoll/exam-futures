import {IFutures} from "./futures.interface";

export class Futures implements IFutures {
  series: number;
  min: number;
  max: number;
  label: string;
  constructor(series)
  {
    this.min = 0
    this.max = 0
    this.label = `Series:`+ series
    this.series = series
  }

}
