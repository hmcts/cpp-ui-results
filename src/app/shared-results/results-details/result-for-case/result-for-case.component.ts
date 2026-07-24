import { Component, input } from '@angular/core';
import { PdkCore, PdkGrid } from '@cpp/pdk';
import { UiCoreCollapsibleComponent } from '../../../uicore-collapsible/uicore-collapsible.component';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { CPPDatePipe } from '../../../pipes/cpp-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { ProsecutionCase } from 'src/app/core';

@Component({
  selector: 'result-for-case',
  templateUrl: './result-for-case.component.html',
  styleUrls: ['./result-for-case.component.scss'],
  imports: [
    PdkCore,
    UiCoreCollapsibleComponent,
    PdkGrid,
    CapitalizePipe,
    CPPDatePipe,
    TranslatePipe
  ]
})
export class ResultForCaseComponent {
  readonly case = input<ProsecutionCase>(undefined);
}
