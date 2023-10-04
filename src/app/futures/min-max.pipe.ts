import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxPipe',
  standalone: true,
})
export class MaxPipe implements PipeTransform {
  transform(arr) {
   return Math.max(...arr);
  }

}


@Pipe({
  name: 'minPipe',
  standalone: true,
})
export class MinPipe implements PipeTransform {
  transform(arr) {
    return Math.min(...arr);
  }

}
