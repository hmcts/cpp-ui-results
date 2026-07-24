import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as HearingActions from '../actions/hearing';
import {
  LoadHearingResultsAction,
  LoadHearingResultsSuccessAction,
  ApiError,
  LoadCourtDocumentsAction,
  LoadCourtDocumentsSuccessAction
} from '../actions';

import {
  DownloadDocumentAction,
  DownloadDocumentSuccessAction,
  LoadHearingResultsDetailsAction,
  LoadHearingResultsDetailsSuccessAction
} from '../actions/hearing';
import { Hearing, DocumentIndicesItem } from '../model';
import { ResultsService } from '../services/results.service';

@Injectable()
export class HearingEffects {
  private actions$ = inject(Actions);
  private resultsService = inject(ResultsService);

  getHearingResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HearingActions.LOAD_HEARING_RESULTS),
      switchMap((action: LoadHearingResultsAction) => {
        return this.resultsService.getHearingResults(action.payload).pipe(
          map((hearings: Hearing[]) => new LoadHearingResultsSuccessAction(hearings)),
          catchError((error) => of(new ApiError(error)))
        );
      })
    )
  );

  getResultsDetails$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(HearingActions.LOAD_HEARING_RESULT_DETAILS),
      switchMap((action: LoadHearingResultsDetailsAction) => {
        return this.resultsService
          .getResultsDetails({
            hearingId: action.payload.hearingId,
            personId: action.payload.defendantId
          })
          .pipe(
            map((resultsDetails) => {
              const newSuccessPayload = {
                defendantId: action.payload.defendantId,
                hearingId: action.payload.hearingId,
                results: resultsDetails
              };
              return new LoadHearingResultsDetailsSuccessAction(newSuccessPayload);
            }),
            catchError((error) => of(new ApiError(error)))
          );
      })
    )
  );

  downloadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HearingActions.DOWNLOAD_DOCUMENT_ACTION),
      switchMap((action: DownloadDocumentAction) =>
        this.resultsService.downloadPDFCourtDocument(action.materialId).pipe(
          map((document: Blob) => {
            return new DownloadDocumentSuccessAction(document);
          }),
          catchError((error) => of(new ApiError(error)))
        )
      )
    )
  );

  getCourtDocuments$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HearingActions.LOAD_COURT_DOCUMENTS_ACTION),
      switchMap((action: LoadCourtDocumentsAction) => {
        return this.resultsService.getCourtDocumentsByDefendantId(action.payload.defendantId).pipe(
          map((documentIndices: DocumentIndicesItem[]) => {
            return new LoadCourtDocumentsSuccessAction(documentIndices);
          }),
          catchError((error) => of(new ApiError(error)))
        );
      })
    )
  );
}
