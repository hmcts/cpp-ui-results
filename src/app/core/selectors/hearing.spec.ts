import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';

import { AppState, reducers } from '../reducers';
import {
  LoadHearingResultsSuccessAction,
  LoadHearingResultsDetailsSuccessAction
} from '../actions';
import { getHearingResults, getHearingDetailsByIds } from '../selectors';
import { hearingDetails, mockHearing1 } from '@test-helpers';
import { provideHttpClient } from '@angular/common/http';

let store: Store<AppState>;

describe('Hearing selectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideStore(reducers, { runtimeChecks: {} }), provideHttpClient()],
      teardown: { destroyAfterEach: false }
    });

    store = TestBed.inject(Store);
  });

  it('should return the hearing results', () => {
    let result;

    store.select(getHearingResults).subscribe((value) => (result = value));

    expect(result).toEqual([]);

    store.dispatch(new LoadHearingResultsSuccessAction([mockHearing1]));

    expect(result).toEqual([mockHearing1]);
  });

  it('should return the hearing by hearing and person ids', () => {
    let result;

    store
      .select(
        getHearingDetailsByIds({
          hearingId: hearingDetails.hearing.id,
          defendantId: hearingDetails.hearing.prosecutionCases[0].defendants[0].id
        })
      )
      .subscribe((value) => (result = value));

    expect(result).toEqual(undefined);

    const newSuccessPayload = {
      defendantId: hearingDetails.hearing.prosecutionCases[0].defendants[0].id,
      hearingId: hearingDetails.hearing.id,
      results: hearingDetails
    };
    store.dispatch(new LoadHearingResultsDetailsSuccessAction(newSuccessPayload));

    expect(result).toEqual(hearingDetails);
  });
});
