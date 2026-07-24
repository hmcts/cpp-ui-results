import { HearingPerson } from './Hearingperson';

export interface Hearing {
  hearingId: string;
  hearingType: string;
  hearingDate: string;
  urns: string[];
  defendant: HearingPerson;
}

export interface CourtCentre {
  id: string;
  name: string;
  roomId: string;
  roomName: string;
}

export interface DefendantAttendance {
  attendanceDays: string[];
  defendants: string[];
  firstName: string;
  id: string;
  lastName: string;
  status: string;
  title: string;
}

export interface HearingDay {
  listedDurationMinutes: number;
  listingSequence: number;
  sittingDay: string;
}

export interface JudicialRoleType {
  judicialRoleTypeId: string;
  judiciaryType: string;
}

export interface Judiciary {
  firstName: string;
  judicialId: string;
  judicialRoleType: JudicialRoleType;
  lastName: string;
  middleName?: string;
  title: string;
}

export interface CourtClerk {
  firstName: string;
  lastName: string;
  userId: string;
}

export interface DelegatedPowers {
  firstName: string;
  lastName: string;
  userId: string;
}

export interface JudicialResultPrompt {
  isAvailableForCourtExtract: boolean;
  label: string;
  promptSequence: number;
  usergroups: string[];
  value: string;
  welshLabel: string;
}

export interface JudicialResult {
  category: string;
  cjsCode: string;
  courtClerk: CourtClerk;
  delegatedPowers: DelegatedPowers;
  isAdjournmentResult: boolean;
  isAvailableForCourtExtract: boolean;
  isConvictedResult: boolean;
  isDeleted: boolean;
  isFinancialResult: boolean;
  judicialResultId: string;
  judicialResultPrompts: JudicialResultPrompt[];
  label: string;
  lastSharedDateTime: string;
  orderedDate: string;
  orderedHearingId: string;
  rank: number;
  usergroups: string[];
  amendmentDate?: string;
  amendmentReason?: string;
  lastSharedDate?: string;
}

export interface Plea {
  delegatedPowers: DelegatedPowers;
  offenceId: string;
  originatingHearingId: string;
  pleaDate: string;
  pleaValue: string;
}

export interface Offence {
  convictionDate?: string;
  count: number;
  endDate: string;
  id: string;
  judicialResults?: JudicialResult[];
  modeOfTrial: string;
  offenceCode: string;
  offenceDefinitionId: string;
  offenceLegislation: string;
  offenceLegislationWelsh: string;
  offenceTitle: string;
  offenceTitleWelsh: string;
  plea?: Plea;
  startDate: string;
  wording: string;
}

export interface Address {
  address1: string;
  address2: string;
  address3: string;
  address4: string;
}

export interface PersonDetails {
  address: Address;
  dateOfBirth: string;
  firstName: string;
  gender: string;
  interpreterLanguageNeeds: string;
  lastName: string;
  nationalityCode: string;
  nationalityDescription: string;
  nationalityId: string;
}

export interface PersonDefendant {
  bailStatus: string;
  personDetails: PersonDetails;
}

export interface Defendant {
  id: string;
  offences: Offence[];
  personDefendant: PersonDefendant;
  prosecutionCaseId: string;
}

export interface ProsecutionCaseIdentifier {
  prosecutionAuthorityCode: string;
  prosecutionAuthorityId: string;
  caseURN: string;
}

export interface ProsecutionCase {
  caseStatus: string;
  defendants: Defendant[];
  id: string;
  initiationCode: string;
  prosecutionCaseIdentifier: ProsecutionCaseIdentifier;
}

export interface ProsecutionCounsel {
  attendanceDays: string[];
  firstName: string;
  id: string;
  lastName: string;
  prosecutionCases: string[] | ProsecutionCase[];
  status: string;
  title: string;
}

export interface DefenceCounsel {
  attendanceDays: string[];
  firstName: string;
  id: string;
  lastName: string;
  prosecutionCases: string[];
  status: string;
  title: string;
}

export interface SharedResultLine {
  courtClerk: CourtClerk;
}

export interface HearingType {
  description: string;
  id: string;
}

export interface HearingDetail {
  courtCentre: CourtCentre;
  defendantAttendance: DefendantAttendance[];
  hasSharedResults: boolean;
  hearingDays: HearingDay[];
  hearingLanguage: string;
  id: string;
  judiciary: Judiciary[];
  jurisdictionType: string;
  prosecutionCases: ProsecutionCase[];
  prosecutionCounsels: ProsecutionCounsel[];
  defenceCounsels?: DefenceCounsel[];
  sharedResultLines?: SharedResultLine[];
  type: HearingType;
}

export interface HearingDetails {
  hearing: HearingDetail;
  sharedTime: string;
}
