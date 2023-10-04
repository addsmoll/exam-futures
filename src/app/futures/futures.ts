import { DateTime } from 'luxon';

export class Futures {
  id: any;
  value: number;
  date: DateTime;

  constructor(value?: number)
  {
     this.id = this.randomNumber(8)
     this.value = +this.randomNumber(value || 4)
     this.date = DateTime.now(); /* Get the current instant */

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
