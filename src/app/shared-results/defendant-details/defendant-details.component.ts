import { Component, input } from '@angular/core';
import { Defendant } from '../../core';
import { PdkCore } from '@cpp/pdk';
import { AddressPipe } from '../../pipes/address.pipe';
import { AgePipe } from '../../pipes/age.pipe';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { CPPDatePipe } from '../../pipes/cpp-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'defendant-details',
  templateUrl: './defendant-details.component.html',
  imports: [PdkCore, AddressPipe, AgePipe, CapitalizePipe, FullNamePipe, CPPDatePipe, TranslatePipe]
})
export class DefendantDetailsComponent {
  readonly defendant = input<Defendant[]>(undefined);
}
