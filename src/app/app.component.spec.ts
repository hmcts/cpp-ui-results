import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppConfigService } from './config';
import { reducers } from './core/reducers';
import { provideCPPApplicationEnvironment } from '@cpp/application';
import { Title } from '@angular/platform-browser';
import { SystemAnnouncementsService } from '@cpp/users-groups';
import { of } from 'rxjs';
import { TranslateMockPipe } from './mock/translate-mock.pipe';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';

describe('App page component', () => {
  const getAccountUrl = jest.fn();
  const getBaseUrl = jest.fn();
  const getLogoutUrl = jest.fn();
  const getServicesUrl = jest.fn();
  const getAppUrl = jest.fn();

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideStore(reducers, { runtimeChecks: {} }),
        provideCPPApplicationEnvironment({ production: false }),
        provideHttpClient(),
        provideTranslateService(),
        {
          provide: AppConfigService,
          useValue: {
            getAccountUrl,
            getBaseUrl,
            getLogoutUrl,
            getServicesUrl,
            getAppUrl
          }
        },
        { provide: Title, useValue: { getTitle: jest.fn(), setTitle: jest.fn() } },
        {
          provide: SystemAnnouncementsService,
          useValue: {
            getSystemAnnouncements: jest.fn().mockReturnValue(of([]))
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(AppComponent, {
      remove: {
        imports: [TranslatePipe]
      },
      add: {
        imports: [TranslateMockPipe]
      }
    });

    getAccountUrl.mockReturnValue('http://account-url');
    getBaseUrl.mockReturnValue('http://base-url');
    getLogoutUrl.mockReturnValue('http://logout-url');
    getServicesUrl.mockReturnValue('http://services-url');
    getAppUrl.mockReturnValue('http://accessibility-url');
  });

  it('should compile correctly with all header urls', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly when search is available', () => {
    TestBed.inject(AppConfigService).cppHomeUrl = 'https://cpp.home';
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should not include account link when accountUrl is not available', () => {
    getAccountUrl.mockReturnValue('');
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not include logout link when logoutUrl is not available', () => {
    getLogoutUrl.mockReturnValue('');
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
