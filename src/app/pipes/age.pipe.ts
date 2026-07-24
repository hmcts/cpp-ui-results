import { Pipe, PipeTransform } from '@angular/core';

import momentImported from 'moment';
const moment = momentImported; // doing this to do with rollup error

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(date: string): number {
    return moment().diff(date, 'years');
  }
}
