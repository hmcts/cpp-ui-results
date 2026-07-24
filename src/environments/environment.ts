import { provideCppFakeSession } from '@cpp/core';
import { PRISON_ADMIN } from '@cpp/testing/resources';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  providers: [
    provideCppFakeSession({
      defaultUserId: PRISON_ADMIN.userId,
      queryParamInitializer: true
    }),
    provideStoreDevtools({ connectInZone: true })
  ]
};
