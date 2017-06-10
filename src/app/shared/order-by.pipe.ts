import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, orderField: string, desc?: boolean): any {
    array.sort((a, b) => {
      if (a[orderField] < b[orderField]) {
        return -1;
      }
      else if (a[orderField] > b[orderField]) { 
        return 1;
      }
      else {
        return 0;
      }
    });
    return desc ? array : array.reverse();
  }
}
