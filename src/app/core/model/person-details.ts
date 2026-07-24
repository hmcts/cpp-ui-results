import { Address } from './address';

export interface PersonDetails {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;
}
