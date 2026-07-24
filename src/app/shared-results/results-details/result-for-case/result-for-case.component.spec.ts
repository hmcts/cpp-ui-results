import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultForCaseComponent } from './result-for-case.component';
import { hearingDetails } from '@test-helpers';
import { ProsecutionCase } from '../../../core';
import { TranslateMockPipe } from './../../../mock/translate-mock.pipe';
import { TranslatePipe } from '@ngx-translate/core';

describe('ResultForCaseComponent', () => {
  let fixture: ComponentFixture<ResultForCaseComponent>;

  const caseObj: ProsecutionCase = hearingDetails.hearing.prosecutionCases[0];

  beforeEach(() => {
    fixture = TestBed.overrideComponent(ResultForCaseComponent, {
      remove: {
        imports: [TranslatePipe]
      },
      add: {
        imports: [TranslateMockPipe]
      }
    }).createComponent(ResultForCaseComponent);
    fixture.componentRef.setInput('case', caseObj);
    fixture.detectChanges();
  });

  it('should render the template with the values expected', () => {
    expect(fixture).toMatchSnapshot();
  });
});
