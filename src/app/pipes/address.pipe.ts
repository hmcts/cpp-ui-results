import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {
  transform(
    address?: {
      address1: string;
      address2?: string;
      address3?: string;
      address4?: string;
      address5?: string;
      postcode?: string;
    },
    multiLine?: boolean
  ): string {
    if (!address) {
      return '';
    }
    return [
      address.address1,
      address.address2,
      address.address3,
      address.address4,
      address.address5,
      address.postcode
    ]
      .filter((a) => a != null)
      .map((a) => a.trim())
      .join(multiLine ? '<br>' : ', ');
  }
}
