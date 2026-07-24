import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { HearingRequestInfo, ResultDetails } from '../model';
export const getHearingResults = (state: AppState) => state.hearings.results;
export const getHearingDetailsByIds = (hearingInfo: HearingRequestInfo) => {
  return (state: AppState) =>
    state.hearings.details[`${hearingInfo.hearingId}-${hearingInfo.defendantId}`];
};
export const getDefendantDetailsForHearing = () => {
  return (state: AppState) => state.hearings.defendants;
};

export const getCurrentCaseIds = (hearingInfo: HearingRequestInfo) =>
  createSelector(getHearingDetailsByIds(hearingInfo), (state: ResultDetails) => {
    if (!state || !state.hearing || !state.hearing.prosecutionCases) {
      return [];
    }
    return state.hearing.prosecutionCases.map((kase) => kase.id);
  });

export const getCourtDocuments = (state: AppState) => state.hearings.courtDocuments;
