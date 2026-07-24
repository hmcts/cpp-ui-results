import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefendantDetailsComponent } from './defendant-details.component';
import { hearingDetails } from '@test-helpers';
import { TranslateMockPipe } from './../../mock/translate-mock.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { Defendant } from '../../core';

describe('DefendantDetailsComponent', () => {
  let fixture: ComponentFixture<TestDefendantDetailsComponent>;

  const defendantDetails = hearingDetails.hearing.prosecutionCases[0].defendants;

  beforeEach(() => {
    fixture = TestBed.overrideComponent(DefendantDetailsComponent, {
      remove: {
        imports: [TranslatePipe]
      },
      add: {
        imports: [TranslateMockPipe]
      }
    }).createComponent(TestDefendantDetailsComponent);
    fixture.componentInstance.defendant = defendantDetails;
    fixture.detectChanges();
  });

  it('should render the template with the values expected', () => {
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-defendant-details',
    template: `<defendant-details [defendant]="defendant"></defendant-details>`,
    imports: [DefendantDetailsComponent]
  })
  class TestDefendantDetailsComponent {
    defendant: Defendant[];
  }
});
