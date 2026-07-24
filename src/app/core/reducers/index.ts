import { referenceDataReducer, ReferenceDataState } from '@cpp/reference-data';
import { usersGroups, UsersGroupsState } from '@cpp/users-groups';
import { routerReducer as router, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { apiReducer, ApiState } from './api';
import { hearingReducer, HearingState } from './hearing';
import { onlineReducer, OnlineState } from './network-activity';

// The top level hearing results application state interface.
export interface AppState extends ReferenceDataState, UsersGroupsState {
  readonly api: ApiState;
  readonly online: OnlineState;
  readonly hearings: HearingState;
  readonly router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  api: apiReducer,
  online: onlineReducer,
  hearings: hearingReducer,
  referenceData: referenceDataReducer,
  usersGroups: usersGroups,
  router
};

export { HearingState } from './hearing';
