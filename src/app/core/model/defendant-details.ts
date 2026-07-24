export interface DetailsKey {
  hearingId: string;
  personId: string;
}

export interface PersonDetails {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address5: string;
    postCode: string;
  };
}
export interface DefendantDetails {
  id: string;
  hearingId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address5: string;
    postCode: string;
  };
}

export const toDefendantDetails = (personDetails: any, hearingId: string) => {
  return {
    id: personDetails.id,
    hearingId,
    firstName: personDetails.firstName,
    lastName: personDetails.lastName,
    dateOfBirth: personDetails.dateOfBirth,
    address: personDetails.address,
  } as DefendantDetails;
};
