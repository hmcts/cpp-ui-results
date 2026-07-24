import { Pipe, PipeTransform } from '@angular/core';
import { CPPDate, getCPPDate } from '../core/utils/cpp-date';

@Pipe({ name: 'cppDate' })
export class CPPDatePipe implements PipeTransform {
  private readonly cppDateUtil: CPPDate;

  constructor() {
    this.cppDateUtil = getCPPDate();
  }

  transform(utcDate: Date | string, format = 'D MMMM YYYY'): string {
    if (!utcDate) {
      return '';
    }

    const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
    const localDate = this.cppDateUtil.localDate(date);

    return this.cppDateUtil.format(localDate, format);
  }
}
