import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ErrorRouteState, ERROR_ROUTE_PATHS } from '@cpp/application';
import * as ApiActions from '../actions/api';
import { ApiError } from '../actions';
import { throttleTime, map, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getCurrentUrl } from '../selectors';
import { AppState } from '../reducers';

@Injectable()
export class RouterEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);

  navigateApiError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.API_ERROR),
        throttleTime(1000),
        withLatestFrom(this.store.pipe(select(getCurrentUrl))),
        map(([{ response }, currentUrl]: [ApiError, string]): ErrorRouteState => {
          const state = {
            redirectUrl: `/hearing-results${currentUrl}`
          } as ErrorRouteState;

          switch (response.status) {
            case 403:
              return {
                ...state,
                errorPath: `/${ERROR_ROUTE_PATHS.unauthorised}`
              };
            case 404:
              return {
                ...state,
                errorPath: `/${ERROR_ROUTE_PATHS.pageNotFound}`
              };
            case 401:
              return {
                ...state,
                errorPath: `/${ERROR_ROUTE_PATHS.signedOutError}`
              };
            default:
              return {
                ...state,
                errorPath: `/${ERROR_ROUTE_PATHS.technicalError}`
              };
          }
        }),
        tap((routeState) => this.router.navigate([routeState.errorPath], { state: routeState }))
      ),
    { dispatch: false }
  );
}
