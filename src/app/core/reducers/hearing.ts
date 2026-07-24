import * as HearingActions from '../actions/hearing';
import { HearingAction } from '../actions';
import { HearingResults, ResultDetails, DocumentIndicesItem } from '../model';

export interface HearingState {
  results: HearingResults[];
  details: { [compositeId: string]: ResultDetails };
  defendants: any;
  courtDocuments: DocumentIndicesItem[];
}

const initialState: HearingState = {
  results: [],
  details: {} as { HearingDetailsKeyedById },
  defendants: [],
  courtDocuments: [],
};

export function hearingReducer(
  state: HearingState = initialState,
  action: HearingAction
): HearingState {
  switch (action.type) {
    case HearingActions.LOAD_HEARING_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.payload,
      };

    case HearingActions.LOAD_COURT_DOCUMENTS_SUCCESS_ACTION:
      return {
        ...state,
        courtDocuments: action.payload,
      };

    case HearingActions.LOAD_HEARING_RESULTS_DETAILS_SUCCESS:
      const defendants = action.payload.results.hearing.prosecutionCases[0].defendants;
      return {
        ...state,
        details: {
          ...state.details,
          [`${action.payload.hearingId}-${action.payload.defendantId}`]: action.payload.results,
        },
        defendants: defendants,
      };

    default:
      return state;
  }
}
