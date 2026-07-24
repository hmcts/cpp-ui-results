import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { SharedResultsContainer } from './shared-results.container';
import {
  AppState,
  HearingState,
  LoadHearingResultsDetailsAction,
  LoadCourtDocumentsAction
} from '../core';
import { getActions, hearingDetails, mockHearing1 } from '@test-helpers';
import { Actions } from '@ngrx/effects';
import { TranslateMockPipe } from '../mock/translate-mock.pipe';
import { provideHttpClient } from '@angular/common/http';
@Component({
  template: ` <shared-results /> `,
  imports: [SharedResultsContainer]
})
class TestHostComponent {}

describe('SharedResultsContainer', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  let state;
  let selectSpy;
  let dispatchSpy;
  let createObjectURL: jasmine.Spy;
  let open: jasmine.Spy;

  const selectedHearingId = '123';
  const selectedPersonId = '456';

  const hearingState: HearingState = {
    results: [],
    details: {
      [`${hearingDetails.id}-${hearingDetails.hearing.prosecutionCases[0].defendants[0].id}`]:
        hearingDetails
    },
    defendants: hearingDetails.hearing.prosecutionCases[0].defendants,
    courtDocuments: null
  };

  const store: Store<AppState> = null;
  const paramMap = of({
    get: (param) => (param === 'hearingId' ? selectedHearingId : selectedPersonId)
  });

  beforeEach(fakeAsync(() => {
    state = {
      hearings: hearingState,
      results: [mockHearing1],
      userGroup: { usergroup: [{ groupName: 'Police Admin' }] }
    };
    selectSpy = jasmine.createSpy('select').and.callFake((selectorFunc) => {
      return of(selectorFunc.call(store, state));
    });
    dispatchSpy = jasmine.createSpy('dispatch');
    createObjectURL = jasmine.createSpy();
    open = jasmine.createSpy();
    const windowMock: Window = <any>{ URL: { createObjectURL }, open };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideTranslateService(),
        provideRouter([{ path: ':defendantId/:hearingId', component: SharedResultsContainer }]),
        { provide: Actions, useFactory: getActions },
        { provide: Store, useValue: { select: selectSpy, dispatch: dispatchSpy } },
        { provide: ActivatedRoute, useValue: { paramMap: paramMap } },
        { provide: 'Window', useFactory: () => windowMock }
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(SharedResultsContainer, {
      remove: {
        imports: [TranslatePipe]
      },
      add: {
        imports: [TranslateMockPipe]
      }
    });
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  }));

  it('should have called the store to select the 3 pieces of required data', () => {
    expect(selectSpy).toHaveBeenCalledTimes(3);
  });

  it('should have dispatched an action to load the required data', () => {
    const expectedAction = new LoadHearingResultsDetailsAction({
      hearingId: selectedHearingId,
      defendantId: selectedPersonId
    });
    expect(dispatchSpy.calls.mostRecent().args[0]).toEqual(expectedAction);
  });

  it('should have dispatched an action to load the documents', () => {
    const expectedAction = new LoadCourtDocumentsAction({
      defendantId: selectedPersonId
    });
    expect(dispatchSpy.calls.first().args[0]).toEqual(expectedAction);
  });
});
