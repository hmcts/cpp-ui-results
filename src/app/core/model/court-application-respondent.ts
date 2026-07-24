import { CourtApplicationParty } from './court-application-party';
import { CourtApplicationResponse } from './court-application-response';

export interface CourtApplicationRespondent {
  applicationResponse: CourtApplicationResponse;
  partyDetails: CourtApplicationParty;
}
