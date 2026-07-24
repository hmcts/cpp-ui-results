import { Component, input, output } from '@angular/core';
import { HearingResults, HearingRequestInfo } from '../../core';
import { PdkGrid, PdkCore, PdkTable } from '@cpp/pdk';
import { UpperCasePipe } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { CPPDatePipe } from '../../pipes/cpp-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'hearing-results',
  templateUrl: './hearing-results.html',
  styleUrls: ['./hearing-results.scss'],
  imports: [
    PdkGrid,
    PdkCore,
    PdkTable,
    UpperCasePipe,
    CapitalizePipe,
    FullNamePipe,
    CPPDatePipe,
    TranslatePipe
  ]
})
export class HearingResultsComponent {
  readonly hearings = input<HearingResults[]>(undefined);
  readonly resultClick = output<HearingRequestInfo>();

  onResultsClick(hearingRequestInfo: HearingRequestInfo) {
    this.resultClick.emit(hearingRequestInfo);
  }
}
