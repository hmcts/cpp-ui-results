import { Component, input } from '@angular/core';

import { ResultForCaseComponent } from './result-for-case/result-for-case.component';
import { ProsecutionCase } from 'src/app/core';

@Component({
  selector: 'results-details',
  templateUrl: './results-details.component.html',
  imports: [ResultForCaseComponent]
})
export class ResultsDetailsComponent {
  readonly prosecutionCases = input<ProsecutionCase[]>(undefined);
}
