import { Injectable, inject } from '@angular/core';
import { CppHttp, mapObjectToHttpParams } from '@cpp/core';
import { HearingRequest } from '../model/hearing-request';
import { Observable } from 'rxjs';
import {
  Hearing,
  DetailsKey,
  HearingDetails,
  PersonDetails,
  ResultDetails,
  DocumentIndicesItem
} from '../model';
import { downloadResponse, constructApiEndPointUrl } from '../utils/utils-helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  readonly api = inject(CppHttp);

  getHearingResults(params: HearingRequest): Observable<Hearing[]> {
    const { fromDate } = params;

    return this.api
      .query<{ results: Hearing[] }>({
        url: `/results-query-api/query/api/rest/results/results/summary?fromDate=${fromDate}`,
        requestType: 'application/vnd.results.results-summary+json'
      })
      .pipe(map((res) => res.results));
  }

  getHearingDetails(params: DetailsKey): Observable<HearingDetails> {
    const { hearingId, personId } = params;

    return this.api
      .query<HearingDetails>({
        url: `/results-query-api/query/api/rest/results/people/${personId}/hearings/${hearingId}`,
        requestType: 'application/vnd.results.hearing-details+json'
      })
      .pipe(map((res) => res));
  }

  getPersonDetails(params: DetailsKey): Observable<PersonDetails> {
    const { hearingId, personId } = params;

    return this.api
      .query<PersonDetails>({
        url: `/results-query-api/query/api/rest/results/people/${personId}/hearings/${hearingId}`,
        requestType: 'application/vnd.results.person-details+json'
      })
      .pipe(map((res) => res));
  }

  getResultsDetails(params: DetailsKey): Observable<ResultDetails> {
    const { hearingId, personId } = params;

    return this.api
      .query<ResultDetails>({
        url: `/results-query-api/query/api/rest/results/people/${personId}/hearings/${hearingId}`,
        requestType: 'application/vnd.results.hearing-details+json'
      })
      .pipe(map((res) => res));
  }

  downloadPDFCourtDocument(materialId: string): Observable<Blob> {
    const url = constructApiEndPointUrl(
      'progressionQuery',
      'material',
      'nows',
      materialId,
      'content'
    );
    return this.api
      .query<Blob>({
        url,
        requestType: 'application/vnd.progression.query.material-nows-content+json',
        responseType: 'blob'
      })
      .pipe(map(downloadResponse));
  }

  getCourtDocumentsByDefendantId(defendantId: string) {
    const url = constructApiEndPointUrl('progressionQuery', 'courtdocumentsearch');
    const params = mapObjectToHttpParams({ defendantId: defendantId });

    return this.api
      .query<{ documentIndices: DocumentIndicesItem[] }>({
        url,
        requestType: 'application/vnd.progression.query.courtdocuments+json',
        params
      })
      .pipe(map((res) => res.documentIndices));
  }
}
