import { CourtApplicationParty } from './court-application-party';
import { CourtApplicationOutcome } from './court-application-outcome';
import { CourtApplicationPayment } from './court-application-payment';
import { JudicialResult } from './judicial-result';
import { CourtApplicationRespondent } from './court-application-respondent';
import { CourtApplicationType } from './court-application-type';

export interface CourtApplication {
  applicant: CourtApplicationParty;
  applicationDecisionSoughtByDate: string;
  applicationOutcome: CourtApplicationOutcome;
  applicationParticulars: string;
  applicationReceivedDate: string;
  applicationReference: string;
  applicationStatus: string;
  courtApplicationPayment: CourtApplicationPayment;
  id: string;
  judicialResults: JudicialResult[];
  linkedApplicationId: string;
  linkedCaseId: string;
  outOfTimeReasons: string;
  respondents: CourtApplicationRespondent[];
  respondentsNA: boolean;
  type: CourtApplicationType;
  parentApplicationId?: string;
  dueDate?: string;
}
