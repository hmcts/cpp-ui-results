import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import uuid from 'uuid/v4';
import { provideCPPApplicationEnvironment } from '@cpp/application';
import { provideReferenceDataEnvironmentContext } from '@cpp/reference-data';
import { environment } from './environments/environment';
import { provideUserGroupsEnvironmentContext } from '@cpp/users-groups';
import { GENERATE_UNIQUE_KEY, provideCppCoreHttpServices, withCppHttpOverrides } from '@cpp/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { appRoutes } from './app/app-routes';
import { provideRouter, withRouterConfig } from '@angular/router';
import { AppConfigService } from './app/config';
import { CCE2EHttp } from './app/core/services/http/http';
import { provideStore } from '@ngrx/store';
import { HearingEffects, reducers, RouterEffects } from './app/core';
import { provideRouterStore, RouterState } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const bootstrapAppConfig: ApplicationConfig = {
  providers: [
    {
      provide: GENERATE_UNIQUE_KEY,
      useValue: uuid
    },
    { provide: 'Window', useValue: window },
    provideProtractorTestingSupport(),
    provideRouter(
      appRoutes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    ),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: 'i18n/',
        suffix: '.json'
      })
    }),
    provideAppInitializer(async () => await inject(AppConfigService).load()),
    provideStore(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    provideRouterStore({ routerState: RouterState.Minimal }),
    provideEffects([HearingEffects, RouterEffects]),
    provideCppCoreHttpServices(withCppHttpOverrides(AppConfigService, CCE2EHttp)),
    provideUserGroupsEnvironmentContext(),
    provideCPPApplicationEnvironment(environment),
    provideReferenceDataEnvironmentContext(),
    ...environment.providers
  ]
};
