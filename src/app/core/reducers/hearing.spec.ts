import * as HearingActions from '../actions/hearing';
import { hearingReducer, HearingState } from './hearing';
import { HearingResults, ResultDetails } from '../model';

describe('hearingReducer', () => {
  const mockedHearingState = <HearingState>{
    results: [],
    details: {} as { [compositeId: string]: ResultDetails },
    defendants: []
  };
  const mockHearingResults: HearingResults = {
    hearingId: 'string',
    hearingType: 'string',
    hearingDate: 'string',
    urns: ['1'],
    defendant: {
      firstName: 'Raymond',
      lastName: 'Bardazzi',
      personId: 'a45f9340-2153-11e9-a44d-d19789f8880c'
    }
  };

  it('should add the hearing results to the list of results', () => {
    const state = mockedHearingState;
    const actual = hearingReducer(
      state,
      new HearingActions.LoadHearingResultsSuccessAction([mockHearingResults])
    );
    expect(actual.results).toEqual([mockHearingResults]);
  });

  it('should return initial state for unknown action', () => {
    const state = mockedHearingState;
    const actual = hearingReducer(state, { type: 'UNKNOWN_ACTION' } as any);
    expect(actual).toEqual(state);
  });

  it('should handle LoadHearingResultsDetailsSuccessAction', () => {
    const state = mockedHearingState;
    const mockDefendants = [{ id: 'defendant-1', firstName: 'Test', lastName: 'User' }];
    const mockDetails = {
      hearing: {
        id: 'hearing-123',
        prosecutionCases: [
          {
            defendants: mockDefendants
          }
        ]
      }
    };
    const action = new HearingActions.LoadHearingResultsDetailsSuccessAction({
      hearingId: 'hearing-123',
      defendantId: 'defendant-123',
      results: mockDetails
    });
    const actual = hearingReducer(state, action);
    expect(actual.details['hearing-123-defendant-123']).toEqual(mockDetails);
    expect(actual.defendants).toEqual(mockDefendants);
  });

  it('should handle LoadCourtDocumentsSuccessAction', () => {
    const state = mockedHearingState;
    const mockDocuments = [
      {
        caseIds: ['case-123'],
        hearingIds: ['hearing-123'],
        defendantIds: ['defendant-123'],
        type: 'Court Final orders',
        category: 'NOW documents',
        document: {
          name: 'Test Document',
          courtDocumentId: 'doc-123',
          documentTypeId: 'type-123',
          isRemoved: 'false',
          mimeType: 'application/pdf',
          documentCategory: {} as any,
          materials: []
        }
      }
    ];
    const action = new HearingActions.LoadCourtDocumentsSuccessAction(mockDocuments);
    const actual = hearingReducer(state, action);
    expect(actual.courtDocuments).toEqual(mockDocuments);
  });
});
