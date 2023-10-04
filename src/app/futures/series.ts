import {ISeries} from "./series.interface";
import {Futures} from "./futures";

export class Series implements ISeries {
  id: any;
  series: number;
  values: Futures[];
  min: number;
  max: number;
  label: string;
  constructor(series)
  {
    this.id = series;
    this.min = 0
    this.max =  0
    this.label = `Series:`+ series
    this.series = series
    this.values = [];
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
