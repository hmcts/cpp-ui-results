import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HearingDetailsComponent } from './hearing-details.component';
import { hearingDetails } from '@test-helpers';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';

describe('HearingDetailsComponent', () => {
  let fixture: ComponentFixture<HearingDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HearingDetailsComponent],
      providers: [provideHttpClient(), provideTranslateService()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingDetailsComponent);
    fixture.componentRef.setInput('hearing', hearingDetails.hearing);
    fixture.detectChanges();
  });

  it('should render the template with the values expected', () => {
    expect(fixture).toMatchSnapshot();
  });
});
