import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PdkCore } from '@cpp/pdk';
import { UpperCasePipe } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { CPPDatePipe } from '../../pipes/cpp-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { HearingDetail } from '../../core/model/hearing';

@Component({
  selector: 'hearing-details',
  templateUrl: './hearing-details.component.html',
  styleUrls: ['./hearing-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PdkCore, UpperCasePipe, CapitalizePipe, CPPDatePipe, TranslatePipe]
})
export class HearingDetailsComponent {
  readonly hearing = input<HearingDetail>(undefined);
  readonly sharedTime = input<string>(undefined);
}
