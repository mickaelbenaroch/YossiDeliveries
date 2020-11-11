import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ils'
})
export class IlsPipe implements PipeTransform {

  transform(value: number): string {
    return ' ₪ ' + value.toString();
  }

}
