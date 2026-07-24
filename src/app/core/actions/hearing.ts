import { Action } from '@ngrx/store';
import { HearingResults, HearingRequestInfo } from '../model';
import { DocumentIndicesItem } from '../model/document-indices.model';

export const LOAD_HEARING_RESULTS = 'LOAD_HEARING_RESULTS';
export const LOAD_HEARING_RESULTS_SUCCESS = 'LOAD_HEARING_RESULTS_SUCCESS';
export const LOAD_HEARING_RESULTS_FAILURE = 'LOAD_HEARING_RESULTS_FAILURE';

export const LOAD_HEARING_RESULT_DETAILS = 'LOAD_HEARING_RESULT_DETAILS';
export const LOAD_HEARING_RESULTS_DETAILS_SUCCESS = 'LOAD_HEARING_RESULTS_DETAILS_SUCCESS';

export const DOWNLOAD_DOCUMENT_ACTION = 'DOWNLOAD_DOCUMENT_ACTION';
export const DOWNLOAD_DOCUMENT_SUCCESS_ACTION = 'DOWNLOAD_DOCUMENT_SUCCESS_ACTION';

export const LOAD_COURT_DOCUMENTS_ACTION = 'LOAD_COURT_DOCUMENTS_ACTION';
export const LOAD_COURT_DOCUMENTS_SUCCESS_ACTION = 'LOAD_COURT_DOCUMENTS_SUCCESS_ACTION';

export class LoadHearingResultsAction implements Action {
  readonly type = LOAD_HEARING_RESULTS;
  constructor(public payload: { fromDate: string; courtCentreId?: string }) {}
}

export class LoadHearingResultsSuccessAction implements Action {
  readonly type = LOAD_HEARING_RESULTS_SUCCESS;
  constructor(public payload: HearingResults[]) {}
}

export class LoadHearingResultsFailureAction implements Action {
  readonly type = LOAD_HEARING_RESULTS_FAILURE;
  constructor(public payload: any) {}
}

export class LoadHearingResultsDetailsAction implements Action {
  readonly type = LOAD_HEARING_RESULT_DETAILS;
  constructor(public readonly payload: HearingRequestInfo) {}
}

export class LoadHearingResultsDetailsSuccessAction implements Action {
  readonly type = LOAD_HEARING_RESULTS_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class DownloadDocumentAction implements Action {
  readonly type = DOWNLOAD_DOCUMENT_ACTION;
  constructor(public readonly materialId: string) {}
}

export class DownloadDocumentSuccessAction implements Action {
  readonly type = DOWNLOAD_DOCUMENT_SUCCESS_ACTION;
  constructor(public payload: Blob) {}
}

export class LoadCourtDocumentsAction implements Action {
  readonly type = LOAD_COURT_DOCUMENTS_ACTION;
  constructor(
    public readonly payload: {
      defendantId: string;
    }
  ) {}
}

export class LoadCourtDocumentsSuccessAction implements Action {
  readonly type = LOAD_COURT_DOCUMENTS_SUCCESS_ACTION;
  constructor(public readonly payload: DocumentIndicesItem[]) {}
}

export type HearingAction =
  | LoadHearingResultsAction
  | LoadHearingResultsSuccessAction
  | LoadHearingResultsFailureAction
  | LoadHearingResultsDetailsAction
  | LoadHearingResultsDetailsSuccessAction
  | DownloadDocumentAction
  | DownloadDocumentSuccessAction
  | LoadCourtDocumentsSuccessAction
  | LoadCourtDocumentsAction;
