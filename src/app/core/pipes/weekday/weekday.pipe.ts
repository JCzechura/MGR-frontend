import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if(value){
      switch (value) {
        case 0:
          return 'poniedziałek';
        case 1:
          return 'wtorek';
        case 2:
          return 'środa';
        case 3:
          return 'czwartek';
        case 4:
          return 'piątek';
        case 5:
          return 'sobota';
        case 6:
          return 'niedziela';
        default:
          return '-';
      }
    }
    return '-';
  }

}
