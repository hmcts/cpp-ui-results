import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import moment from 'moment';
import { HearingRequestInfo } from '../core';

const dateSelectOptions = [
  { value: 1, label: 'Last month', selected: true },
  { value: 2, label: 'Last 2 months' },
  { value: 3, label: 'Last 3 months' },
  { value: 6, label: 'Last 6 months' },
  { value: 9, label: 'Last 9 months' },
  { value: 12, label: 'Last 12 months' },
  { value: 15, label: 'Last 15 months' },
  { value: 18, label: 'Last 18 months' },
  { value: 21, label: 'Last 21 months' },
  { value: 24, label: 'Last 24 months' }
];

import {
  AppState,
  LoadHearingResultsAction,
  FilterOption,
  DefaultOptions,
  HearingResults,
  getHearingResults
} from '../core';
import { CourtCentre } from '../core/model/court-centre';
import { getOrganisationUnits, OrganisationUnit } from '@cpp/reference-data';
import { map } from 'rxjs/operators';
import { PdkCore, PdkGrid } from '@cpp/pdk';
import { HearingResultsFilterComponent } from './hearing-results-filter/hearing-results-filter.component';
import { HearingResultsComponent } from './hearing-results/hearing-results.component';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'hearing-list',
  templateUrl: 'hearing-list.container.html',
  styleUrls: ['./hearing-list.container.scss'],
  imports: [
    PdkCore,
    PdkGrid,
    HearingResultsFilterComponent,
    HearingResultsComponent,
    AsyncPipe,
    TranslatePipe
  ]
})
export class HearingListContainer implements OnInit {
  private window = inject<Window>('Window' as any);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);

  dateOptions: FilterOption[] = dateSelectOptions;
  selectedOptions: DefaultOptions = {
    dateFilter: dateSelectOptions[0].value,
    courtHouseFilter: null
  };
  displayHearings: any;
  courtCentres$: Observable<CourtCentre[]>;
  hearings$: HearingResults[];

  ngOnInit(): void {
    this.store.select(getHearingResults).subscribe((hearings) => {
      this.displayHearings = hearings;
      this.hearings$ = hearings;
    });
    this.courtCentres$ = this.store
      .select(getOrganisationUnits)
      .pipe(map(this.mapOrganisationUnitsToCourtCentres));
  }

  private getDateOffset = (months: string) => {
    const d = moment().subtract(months, 'months');
    return d.format('YYYY-MM-DD');
  };
  /**
   * navigate hearing Result Detail
   * @param key
   */
  goToHearingResult(key: HearingRequestInfo) {
    this.router
      .navigate([`/${key.defendantId}/${key.hearingId}`])
      .then(() => this.window.scroll(0, 0));
  }

  /**
   * Listen to filter changes
   * @param options
   */
  controlsChanged(options: DefaultOptions): void {
    if (options.dateFilter) {
      this.selectedOptions.dateFilter = Number(options.dateFilter);
      this.loadResultHearings();
    }
    if (options.courtHouseFilter) {
      this.selectedOptions.courtHouseFilter = options.courtHouseFilter;
      if (this.selectedOptions.courtHouseFilter.id !== '') {
        this.hearings$ = this.displayHearings.filter(
          (h) => h.courtCentreId === this.selectedOptions.courtHouseFilter.id
        );
      } else {
        this.hearings$ = this.displayHearings;
      }
    }
  }

  /**
   * Load hearing Results
   */
  loadResultHearings(): void {
    this.store.dispatch(
      new LoadHearingResultsAction({
        fromDate: this.getDateOffset(this.selectedOptions.dateFilter.toString()),
        courtCentreId:
          this.selectedOptions.courtHouseFilter !== null
            ? this.selectedOptions.courtHouseFilter.toString()
            : ''
      })
    );
  }

  mapOrganisationUnitsToCourtCentres(org: OrganisationUnit[]): CourtCentre[] {
    if (org && org.length > 0) {
      return org.map((orgUnit) => ({
        id: orgUnit.id,
        name: orgUnit.oucodeL3Name,
        courtrooms: orgUnit.courtrooms.map((cr) => ({ id: cr.id, name: cr.courtroomName }))
      }));
    }
    return [];
  }
}
