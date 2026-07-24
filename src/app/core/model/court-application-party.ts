import { Defendant, Organisation, AssociatedPerson, Person } from './results-details';
import { ProsecutingAuthority } from './prosecuting-authority';

export interface CourtApplicationParty {
  defendant: Defendant;
  id: string;
  organisation: Organisation;
  organisationPersons: AssociatedPerson[];
  personDetails: Person;
  prosecutingAuthority: ProsecutingAuthority;
  representationOrganisation: Organisation;
  synonym: string;
}
