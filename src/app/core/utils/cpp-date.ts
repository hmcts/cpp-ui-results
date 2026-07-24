import { unitOfTime } from 'moment';
import moment_ from 'moment';
const moment = moment_; // This is needed for the Angular Packaging to work

export class CPPDate {
  public readonly INVALID_DATE_MESSAGE = 'Provide a valid date to parse';
  public readonly US_DATE_FORMAT = 'YYYY-MM-DD';
  public readonly UK_DATE_FORMAT = 'DD-MM-YYYY';
  public readonly SHORT_YEAR = 'YY';

  public readonly YEAR = 'year';
  public readonly DAY = 'day';
  public readonly MONTH = 'month';
  public readonly HOUR = 'hour';
  public readonly MINUTE = 'minute';
  public readonly SECOND = 'second';

  public readonly HOURS_MINUTES_24H = 'HH:mm';

  toUtcISO(dateToParse: Date | string, dateTimeformat = ''): string {
    if (!dateToParse) {
      throw new Error(this.INVALID_DATE_MESSAGE);
    }

    if (dateTimeformat) {
      return moment.utc(moment(dateToParse).toISOString()).format(dateTimeformat);
    }

    return moment(dateToParse).toISOString();
  }

  localDate(dateToParse: string | Date): Date {
    if (!dateToParse) {
      throw new Error(this.INVALID_DATE_MESSAGE);
    }

    return moment(dateToParse).toDate();
  }

  getDateTime(
    year: number,
    month: number,
    day: number,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  ): Date {
    // Months are zero indexed
    if (month > 0) {
      month--;
    }

    return moment()
      .year(year)
      .month(month)
      .date(day)
      .hour(hours)
      .minute(minutes)
      .second(seconds)
      .millisecond(milliseconds)
      .toDate();
  }

  getCurrentDate(): Date {
    return new Date();
  }

  format(dateToFormat: Date | string, dateFormat = this.US_DATE_FORMAT): string {
    return moment(dateToFormat).format(dateFormat);
  }

  add(date: Date, unit: number, unitOfTimeValue = this.DAY): Date {
    return moment(date)
      .add(unit, unitOfTimeValue as unitOfTime.DurationConstructor)
      .toDate();
  }

  subtract(date: Date | string, unit: number, unitOfTimeValue = this.DAY): Date {
    return moment(date)
      .subtract(unit, unitOfTimeValue as unitOfTime.DurationConstructor)
      .toDate();
  }

  isAfter(dateA: Date | string, dateB: Date | string): boolean {
    return moment(dateA).isAfter(dateB);
  }

  isBefore(dateA: Date | string, dateB: Date | string): boolean {
    return moment(dateA).isBefore(dateB);
  }

  diff(dateA: Date | string, dateB: Date | string, unitOfTimeValue = this.DAY): number {
    return moment(dateA).diff(dateB, unitOfTimeValue as unitOfTime.DurationConstructor);
  }

  startOf(date: Date | string, unitOfTimeValue = this.DAY): Date {
    return moment(date)
      .startOf(unitOfTimeValue as unitOfTime.DurationConstructor)
      .toDate();
  }

  isSame(dateA: Date | string, DateB: Date | string, unitOfTimeValue = ''): boolean {
    if (unitOfTimeValue) {
      return moment(dateA).isSame(DateB, unitOfTimeValue as unitOfTime.DurationConstructor);
    }

    return moment(dateA).isSame(DateB);
  }
}

export function getCPPDate(): CPPDate {
  return new CPPDate();
}
