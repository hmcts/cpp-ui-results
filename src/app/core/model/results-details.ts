import { Address } from './address';
import { CourtApplication } from './court-application';
import { JudicialResult } from './hearing';

export interface ResultDetails {
  hearing: ResultHearingDetails;
  sharedTime?: string;
}

export interface ResultHearingDetails {
  id: string;
  courtCentre: ResultCourCentreDetails;
  hearingDays: HearingDay[];
  hearingLanguage: string;
  judiciary: Judiciary;
  jurisdictionType: string;
  defendantAttendance: DefendantAttendance[];
  hasSharedResults: boolean;
  prosecutionCases?: ProsecutionCase[];
  courtApplications?: CourtApplication[];
  type: { id: string; description: string };
  endDate?: string;
}

export interface ResultCourCentreDetails {
  id: string;
  name: string;
  roomId: string;
  roomName: string;
  address: Address;
}

export interface DefendantAttendance {
  defendantId: string;
  attendanceDays: AttendanceDay[];
}

export interface AttendanceDay {
  day: string;
  isInAttendance: boolean;
}

export interface HearingDay {
  listedDurationMinutes: number;
  listingSequence: number;
  sittingDay: string;
}

export interface Judiciary {
  firstName: string;
  judicialId: string;
  judicialRoleType: JudicialRoleType;
  lastName: string;
  middleName: string;
  title: string;
  isDeputy?: boolean;
  isBenchChairman?: boolean;
}

export interface JudicialRoleType {
  judicialRoleTypeId: string;
  judiciaryType: string;
}

export interface ProsecutionCase {
  id: string;
  prosecutionCaseIdentifier: ProsecutionCaseIdentifier;
  originatingOrganisation: string;
  initiationCode: string;
  caseStatus: string;
  defendants: Defendant[];
  statementOfFacts: string;
  statementOfFactsWelsh: string;
}

export interface Defendant {
  id: string;
  prosecutionCaseId: string;
  numberOfPreviousConvictionsCited?: number;
  prosecutionAuthorityReference?: string;
  witnessStatement?: string;
  witnessStatementWelsh?: string;
  mitigation?: string;
  mitigationWelsh?: string;
  offences?: Offence[];
  associatedPersons?: AssociatedPerson[];
  defenceOrganisation: Organisation;
  aliases?: DefendantAlias[];
  personDefendant: PersonDefendant;
  legalEntityDefendant?: {
    organisation: Organisation;
  };
  judicialResults: JudicialResult[];
}

export interface DefendantAlias {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  legalEntityName?: string;
}

export interface ProsecutionCaseIdentifier {
  prosecutionAuthorityId: string;
  prosecutionAuthorityCode: string;
  caseURN?: string;
  prosecutionAuthorityReference?: string;
  prosecutionAddress?: string;
}

export interface AssociatedPerson {
  role: string;
  person: Person;
}

export interface Person {
  id?: string;
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationalityId: string;
  nationalityCode: string;
  nationalityDescription: string;
  additionalNationalityId: string;
  additionalNationalityCode?: string;
  additionalNationalityDescription?: string;
  disabilityStatus?: string;
  ethnicityId: string;
  ethnicityCode?: string;
  ethnicityDescription?: string;
  gender: string;
  interpreterLanguageNeeds?: string;
  documentationLanguageNeeds?: string;
  nationalInsuranceNumber?: string;
  occupation?: string;
  occupationCode?: string;
  specificRequirements?: string;
  address: Address;
  contact: Contact;
}

export interface Contact {
  work?: string;
  home?: string;
  mobile?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  fax?: string;
}

export interface Organisation {
  id?: string;
  name: string;
  incorporationNumber?: string;
  registeredCharityNumber?: string;
  address?: Address;
  contact?: Contact;
}

export interface OffenceFacts {
  vehicleRegistration: string;
  alcoholReadingAmount: string;
  alcoholReadingMethod: string;
}

export interface Offence {
  id: string;
  offenceDefinitionId: string;
  offenceCode: string;
  offenceTitle: string;
  offenceTitleWelsh?: string;
  offenceLegislation: string;
  offenceLegislationWelsh?: string;
  wording: string;
  wordingWelsh?: string;
  startDate: string;
  endDate: string;
  arrestDate: string;
  chargeDate: string;
  orderIndex: number;
  count: number;
  notifiedPlea: {
    offenceId: string;
    notifiedPleaDate: string;
    notifiedPleaValue: string;
  };
  offenceFacts: OffenceFacts;
  judicialResults?: JudicialResult[];
  convictionDate?: string;
  verdict?: {
    verdictType: {
      category: string;
    };
    verdictDate: string;
  };
  plea?: {
    pleaDate: string;
    pleaValue: string;
  };
}

export interface PersonDefendant {
  personDetails: Person;
  bailStatus: string;
  custodyTimeLimit: string;
  perceivedBirthYear: number;
  observedEthnicityId?: string;
  observedEthnicityCode?: string;
  observedEthnicityDescription?: string;
  selfDefinedEthnicityId?: string;
  selfDefinedEthnicityCode?: string;
  selfDefinedEthnicityDescription?: string;
  driverNumber: string;
  pncId?: string;
  arrestSummonsNumber?: string;
  employerOrganisation?: Organisation;
  employerPayrollReference?: string;
}
