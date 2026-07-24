import { Routes } from '@angular/router';
import { OrganisationUnitsGuard } from '@cpp/reference-data';
import {
  ERROR_PAGES_ROUTES,
  ERROR_ROUTE_PATHS,
  SYSTEM_ANNOUNCEMENT_ROUTES
} from '@cpp/application';
import { UserDetailsGuard, UserGroupsGuard } from '@cpp/users-groups';

// It is important to load the User related guards first as Service availability anchors on these guards.
export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [UserGroupsGuard, UserDetailsGuard],
    data: {
      serviceUnavailableRedirectTo: `/${ERROR_ROUTE_PATHS.serviceUnavailable}`
    },
    children: [
      {
        path: '',
        canActivate: [OrganisationUnitsGuard],
        loadComponent: () =>
          import('./hearing-list/hearing-list.container').then((m) => m.HearingListContainer),
        data: {
          title: 'Available hearing results | Common platform'
        }
      },
      {
        path: ':defendantId/:hearingId',
        pathMatch: 'full',
        loadComponent: () =>
          import('./shared-results/shared-results.container').then((m) => m.SharedResultsContainer),
        data: { title: 'Hearing results | Common platform' }
      }
    ]
  },
  ...SYSTEM_ANNOUNCEMENT_ROUTES,
  ...ERROR_PAGES_ROUTES
];
