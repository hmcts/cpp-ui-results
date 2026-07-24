import { HearingPerson } from './Hearingperson';

export interface HearingResults {
  hearingId: string;
  hearingType: string;
  hearingDate: string;
  urns: string[];
  defendant: HearingPerson;
}
