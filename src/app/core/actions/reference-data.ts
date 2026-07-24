import { Action } from '@ngrx/store';
import { CourtCentre } from '../model/court-centre';

export const LOAD_COURT_CENTRES = 'LOAD_COURT_CENTRES';
export const LOAD_COURT_CENTRES_SUCCESS = 'LOAD_COURT_CENTRES_SUCCESS';

export class LoadCourtCentresAction implements Action {
  readonly type = LOAD_COURT_CENTRES;
}

export class LoadCourtCentresSuccessAction implements Action {
  readonly type = LOAD_COURT_CENTRES_SUCCESS;
  constructor(public payload: CourtCentre[]) {}
}

export type ReferenceDataAction = LoadCourtCentresAction | LoadCourtCentresSuccessAction;
