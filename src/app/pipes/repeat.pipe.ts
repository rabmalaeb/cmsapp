import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat'
})
export class RepeatPipe implements PipeTransform {

  /**
   * use to repeat n number of times : let i of 20 | repeat
   * @param value the value that we want to repeat for
   * @param args
   */
  transform(value: any, args?: any): any {
    return new Array(value).fill(1);
  }

}
