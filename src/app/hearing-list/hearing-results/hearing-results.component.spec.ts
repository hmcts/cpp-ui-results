import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HearingResultsComponent } from './hearing-results.component';
import { HearingResults } from '../../core';
import { By } from '@angular/platform-browser';
import { TranslateMockPipe } from '../../mock/translate-mock.pipe';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';

let mockValue;

@Component({
  template: ` <hearing-results [hearings]="hearings" (resultClick)="onResultClick($event)" /> `,
  imports: [HearingResultsComponent]
})
class TestHostComponent {
  hearings: HearingResults[] = [
    {
      hearingId: '6843dd0b-6786-40d7-88ad-b01eb4cfd4a3',
      hearingType: 'TRIAL',
      hearingDate: '2018-02-06',
      urns: ['96GD5317818'],
      defendant: {
        personId: '1982bab3-a7bc-46dd-acc1-9f6b85e00fd2',
        firstName: 'Gail',
        lastName: 'Rose'
      }
    }
  ];

  onResultClick($event) {
    mockValue = $event;
  }
}

describe('HearingResultsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideTranslateService()],
      teardown: { destroyAfterEach: false }
    })
      .overrideComponent(HearingResultsComponent, {
        remove: {
          imports: [TranslatePipe]
        },
        add: {
          imports: [TranslateMockPipe]
        }
      })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    tick();
  }));

  it('should render the template with the values expected', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should fire an event when clicked on a row', fakeAsync(() => {
    const row = fixture.debugElement.query(By.css('[data-test-id="hearingResult"]'));
    row.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    expect(mockValue).toEqual({
      hearingId: '6843dd0b-6786-40d7-88ad-b01eb4cfd4a3',
      defendantId: '1982bab3-a7bc-46dd-acc1-9f6b85e00fd2'
    });
  }));
});
