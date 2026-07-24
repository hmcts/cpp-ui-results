import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { CppHttp } from '@cpp/core';
import { HearingEffects } from './hearing';
import {
  DownloadDocumentAction,
  DownloadDocumentSuccessAction,
  LoadHearingResultsAction,
  LoadHearingResultsSuccessAction,
  LoadHearingResultsDetailsAction,
  LoadHearingResultsDetailsSuccessAction,
  LoadCourtDocumentsAction,
  LoadCourtDocumentsSuccessAction,
  ApiError
} from '../actions';
import { reducers } from '../reducers';
import { Action, provideStore } from '@ngrx/store';
import { getActions, mockHearing1 } from '@test-helpers';
import { ResultsService } from '../services/results.service';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Hearing effects', () => {
  let actions$ = new Observable<Action>();
  let effects: HearingEffects;
  const getHearingResults = jasmine.createSpy('getHearingResults');
  const downloadPDFCourtDocument = jasmine.createSpy('downloadPDFCourtDocument');
  const getResultsDetails = jasmine.createSpy('getResultsDetails');
  const getCourtDocumentsByDefendantId = jasmine.createSpy('getCourtDocumentsByDefendantId');
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        provideHttpClient(),
        HearingEffects,
        {
          provide: ResultsService,
          useValue: {
            getHearingResults,
            downloadPDFCourtDocument,
            getResultsDetails,
            getCourtDocumentsByDefendantId
          }
        },
        { provide: Actions, useFactory: getActions },
        {
          provide: CppHttp,
          useValue: {
            query: jasmine.createSpy(),
            commandSync: jasmine.createSpy()
          }
        },
        provideMockActions(() => actions$)
      ],
      teardown: { destroyAfterEach: false }
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(HearingEffects);
  });

  describe('getHearingResults$', () => {
    it('should return the list of hearings from LoadHearingResultsSuccessAction', () => {
      const inputAction = new LoadHearingResultsAction({ fromDate: '2018-01-01' });
      const outputAction = new LoadHearingResultsSuccessAction([mockHearing1]);
      actions$ = hot('-a---', { a: inputAction });
      const hearings = cold('-b|', { b: [mockHearing1] });
      const expected$ = cold('--c-', { c: outputAction });
      getHearingResults.and.returnValue(hearings);
      expect(effects.getHearingResults$).toBeObservable(expected$);
    });

    it('should dispatch ApiError on error', () => {
      const inputAction = new LoadHearingResultsAction({ fromDate: '2018-01-01' });
      const errorAction = new ApiError({ status: 500 });
      actions$ = hot('-a---', { a: inputAction });
      const error = cold('-#', {}, { status: 500 });
      const expected$ = cold('--c-', { c: errorAction });
      getHearingResults.and.returnValue(error);
      expect(effects.getHearingResults$).toBeObservable(expected$);
    });
  });

  describe('getResultsDetails$', () => {
    it('should return hearing results details', () => {
      const inputAction = new LoadHearingResultsDetailsAction({
        hearingId: 'hearing-123',
        defendantId: 'defendant-123'
      });
      const mockResultsDetails = { results: [{ id: 'result-1' }] };
      const outputAction = new LoadHearingResultsDetailsSuccessAction({
        hearingId: 'hearing-123',
        defendantId: 'defendant-123',
        results: mockResultsDetails
      });
      actions$ = hot('-a---', { a: inputAction });
      const resultsDetails = cold('-b|', { b: mockResultsDetails });
      const expected$ = cold('--c-', { c: outputAction });
      getResultsDetails.and.returnValue(resultsDetails);
      expect(effects.getResultsDetails$).toBeObservable(expected$);
    });

    it('should dispatch ApiError on error for getResultsDetails', () => {
      const inputAction = new LoadHearingResultsDetailsAction({
        hearingId: 'hearing-123',
        defendantId: 'defendant-123'
      });
      const errorAction = new ApiError({ status: 500 });
      actions$ = hot('-a---', { a: inputAction });
      const error = cold('-#', {}, { status: 500 });
      const expected$ = cold('--c-', { c: errorAction });
      getResultsDetails.and.returnValue(error);
      expect(effects.getResultsDetails$).toBeObservable(expected$);
    });
  });

  describe('downloadDocument$', () => {
    it('should download list of hearings', () => {
      const testBlob = new Blob(['textstream'], { type: 'application/pdf' });
      const inputAction = new DownloadDocumentAction('123');
      const outputAction = new DownloadDocumentSuccessAction(testBlob);
      actions$ = hot('-a--', { a: inputAction });
      const downloadLists = cold('-b|', { b: testBlob });
      const expected$ = cold('--c-', { c: outputAction });
      downloadPDFCourtDocument.and.returnValue(downloadLists);
      expect(effects.downloadDocument$).toBeObservable(expected$);
    });

    it('should dispatch ApiError on download error', () => {
      const inputAction = new DownloadDocumentAction('123');
      const errorAction = new ApiError({ status: 500 });
      actions$ = hot('-a--', { a: inputAction });
      const error = cold('-#', {}, { status: 500 });
      const expected$ = cold('--c-', { c: errorAction });
      downloadPDFCourtDocument.and.returnValue(error);
      expect(effects.downloadDocument$).toBeObservable(expected$);
    });
  });

  describe('getCourtDocuments$', () => {
    it('should return court documents', () => {
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
      const inputAction = new LoadCourtDocumentsAction({ defendantId: 'defendant-123' });
      const outputAction = new LoadCourtDocumentsSuccessAction(mockDocuments);
      actions$ = hot('-a---', { a: inputAction });
      const documents = cold('-b|', { b: mockDocuments });
      const expected$ = cold('--c-', { c: outputAction });
      getCourtDocumentsByDefendantId.and.returnValue(documents);
      expect(effects.getCourtDocuments$).toBeObservable(expected$);
    });

    it('should dispatch ApiError on error for getCourtDocuments', () => {
      const inputAction = new LoadCourtDocumentsAction({ defendantId: 'defendant-123' });
      const errorAction = new ApiError({ status: 500 });
      actions$ = hot('-a---', { a: inputAction });
      const error = cold('-#', {}, { status: 500 });
      const expected$ = cold('--c-', { c: errorAction });
      getCourtDocumentsByDefendantId.and.returnValue(error);
      expect(effects.getCourtDocuments$).toBeObservable(expected$);
    });
  });
});
