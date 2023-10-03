import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      futures: [
        {
          series: 97,
          value: 'initial: 97',
          min: 580,
          max: 690
        },
        {
          series: 98,
          value: 'initial: 98',
          min: 100,
          max: 800
        },
        {
          series: 99,
          value: 'initial: 99',
          min: 40,
          max: 120
        },
      ]
    };
  }
}
