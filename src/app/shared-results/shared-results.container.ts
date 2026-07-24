import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import {
  AppState,
  getDefendantDetailsForHearing,
  getHearingDetailsByIds,
  LoadHearingResultsDetailsAction,
  LoadCourtDocumentsAction,
  getCourtDocuments,
  HearingRequestInfo,
  DownloadDocumentAction,
  DocumentIndicesItem,
  ResultDetails
} from '../core';

import { Actions, ofType } from '@ngrx/effects';
import * as HearingActions from '../core/actions/hearing';
import { saveAs } from 'file-saver-es';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BackButtonComponent } from '../shared/components/back-button/back-button.component';
import { PdkCore, PdkGrid } from '@cpp/pdk';
import { DefendantDetailsComponent } from './defendant-details/defendant-details.component';
import { HearingDetailsComponent } from './hearing-details/hearing-details.component';
import { ResultsDetailsComponent } from './results-details/results-details.component';
import { DocumentVariantsComponent } from './results-details/document-variants/document-variants.component';
import { AsyncPipe } from '@angular/common';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'shared-results',
  templateUrl: './shared-results.container.html',
  styleUrls: ['./shared-results.container.scss'],
  imports: [
    BackButtonComponent,
    PdkCore,
    PdkGrid,
    DefendantDetailsComponent,
    HearingDetailsComponent,
    ResultsDetailsComponent,
    DocumentVariantsComponent,
    AsyncPipe,
    CapitalizePipe,
    TranslatePipe
  ]
})
export class SharedResultsContainer implements OnInit, OnDestroy {
  private store = inject<Store<AppState>>(Store);
  private route = inject(ActivatedRoute);
  private actions$ = inject(Actions);

  selectedHearingDetails$: Observable<ResultDetails>;
  selectedDefendantDetails$: Observable<any>;
  documents$: Observable<DocumentIndicesItem[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  hearingRequestInfo: HearingRequestInfo;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.hearingRequestInfo = {
        hearingId: params.get('hearingId'),
        defendantId: params.get('defendantId')
      };
    });

    this.store.dispatch(
      new LoadCourtDocumentsAction({
        defendantId: this.hearingRequestInfo.defendantId
      })
    );

    this.store.dispatch(new LoadHearingResultsDetailsAction(this.hearingRequestInfo));

    this.actions$
      .pipe(ofType(HearingActions.DOWNLOAD_DOCUMENT_SUCCESS_ACTION), takeUntil(this.destroy$))
      .subscribe((action: HearingActions.DownloadDocumentSuccessAction) => saveAs(action.payload));

    this.documents$ = this.store.select(getCourtDocuments);
  }

  ngOnInit(): void {
    this.selectedHearingDetails$ = this.store.select(
      getHearingDetailsByIds(this.hearingRequestInfo)
    );
    this.selectedDefendantDetails$ = this.store.select(getDefendantDetailsForHearing());
  }

  downloadDocument(materialId: string): void {
    this.store.dispatch(new DownloadDocumentAction(materialId));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
