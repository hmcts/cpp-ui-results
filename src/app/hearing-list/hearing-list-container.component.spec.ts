import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, provideStore } from '@ngrx/store';
import { AppState, LoadHearingResultsAction, reducers } from '../core/';
import { HearingListContainer } from './hearing-list.container';
import moment from 'moment';
import { ReferenceDataService } from '@cpp/reference-data';
import { provideEffects } from '@ngrx/effects';
import { TranslateMockPipe } from '../mock/translate-mock.pipe';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
@Component({
  template: ` <hearing-list /> `,
  imports: [HearingListContainer]
})
class TestHostComponent {}

describe('HearingListContainer', () => {
  let component: HearingListContainer;
  let fixture: ComponentFixture<TestHostComponent>;
  let hearingListContainerFixture: ComponentFixture<HearingListContainer>;
  let navigateSpy;
  let scrollSpy;
  let dispatchSpy;
  let store: Store<AppState> = null;

  beforeEach(fakeAsync(() => {
    navigateSpy = jasmine.createSpy('navigate').and.returnValue(
      new Promise<void>((resolve, reject) => {
        resolve();
      })
    );
    scrollSpy = jasmine.createSpy('scroll');

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: navigateSpy } },
        { provide: 'Window', useValue: { scroll: scrollSpy } },
        { provide: ReferenceDataService, useValue: {} },
        provideHttpClient(),
        provideStore(reducers, { runtimeChecks: {} }),
        provideEffects([]),
        provideTranslateService()
      ],
      teardown: { destroyAfterEach: false }
    })
      .overrideComponent(HearingListContainer, {
        remove: {
          imports: [TranslatePipe]
        },
        add: {
          imports: [TranslateMockPipe]
        }
      })
      .compileComponents();
    tick();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    store = TestBed.inject(Store);
    hearingListContainerFixture = TestBed.createComponent(HearingListContainer);
    component = hearingListContainerFixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should render the template with the values expected', fakeAsync(() => {
    expect(fixture).toMatchSnapshot();
  }));

  it('should update the selectedOption with the value provided', fakeAsync(() => {
    component.controlsChanged({ dateFilter: '1' });
    fixture.detectChanges();
    tick();
    expect(component.selectedOptions).toEqual({ dateFilter: 1, courtHouseFilter: null });
  }));

  it('should have dispatched an action to load hearing results', fakeAsync(() => {
    const months = '1';
    dispatchSpy = spyOn(store, 'dispatch');
    component.controlsChanged({ dateFilter: months });
    fixture.detectChanges();
    tick();

    const expectedFromDate = moment().subtract(months, 'months').format('YYYY-MM-DD');

    const expectedAction = new LoadHearingResultsAction({
      fromDate: expectedFromDate,
      courtCentreId: ''
    });
    expect(dispatchSpy.calls.mostRecent().args[0]).toEqual(expectedAction);
  }));
});
