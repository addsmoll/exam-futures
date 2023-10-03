import {IFutures} from "./futures.interface";

export class Futures implements IFutures {
  id: any;
  series: number;
  min: number;
  max: number;
  label: string;
  constructor(series)
  {
    this.id = series+10;
    this.min = +this.randomNumber(3)
    this.max =  +this.randomNumber(4)
    this.label = `Series:`+ series
    this.series = series
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
