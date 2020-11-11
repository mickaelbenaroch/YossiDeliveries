import { Pipe, PipeTransform } from '@angular/core';
import { strict } from 'assert';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(value: string): string {
    let result = value;
    if (value && value.includes(':')) {
      let temp = value.split(':');
      if (temp && temp.length == 2 ) {
        if (temp[0].length == 1) {
          result = '0' + temp[0] + ':' + temp[1];
        } 
        if (temp[1].length == 1) {
          result = temp[0] + ':' + '0' + temp[1];
        }
      }
    }
    return result;
  }

}
