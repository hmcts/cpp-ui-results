import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  transform(person: { firstName: string; lastName: string }, capitalize = false): string {
    if (person) {
      return (
        (person.firstName ? firstLetterUpperCase(person.firstName) : '') +
        (person.firstName ? ' ' : '') +
        (person.lastName
          ? capitalize
            ? person.lastName.toUpperCase()
            : firstLetterUpperCase(person.lastName)
          : '')
      );
    }
    return '';
  }
}

function firstLetterUpperCase(value: string): string {
  const names = value.split(' ');
  return names
    .map((name) => name.substr(0, 1).toUpperCase() + name.substr(1, name.length - 1))
    .join(' ');
}
