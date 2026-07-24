import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResultsDetailsComponent } from './results-details.component';
import { AppConfigService } from '../../config';
import { hearingDetails } from '@test-helpers';
import { provideHttpClient } from '@angular/common/http';
import { TranslateMockPipe } from './../../mock/translate-mock.pipe';
import { provideTranslateService } from '@ngx-translate/core';

describe('ResultsDetailsComponent', () => {
  let fixture: ComponentFixture<ResultsDetailsComponent>;
  let getBaseUrl: jasmine.Spy;
  getBaseUrl = jasmine.createSpy();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateMockPipe, ResultsDetailsComponent],
      providers: [
        { provide: AppConfigService, useValue: { getBaseUrl } },
        provideHttpClient(),
        provideTranslateService()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsDetailsComponent);
    fixture.componentRef.setInput('prosecutionCases', hearingDetails.hearing.prosecutionCases);
    fixture.detectChanges();
  });

  it('should render the template with the values expected', () => {
    expect(fixture).toMatchSnapshot();
  });
});
