import { Action } from '@ngrx/store';

export const LOAD_USER_GROUP = 'LOAD_USER_GROUP';
export const LOAD_USER_GROUP_SUCCESS = 'LOAD_USER_GROUP_SUCCESS';

export class LoadUserGroupAction implements Action {
  readonly type = LOAD_USER_GROUP;
  constructor() {}
}

export class LoadUserGroupSuccessAction implements Action {
  readonly type = LOAD_USER_GROUP_SUCCESS;
  constructor(public payload: any[]) {}
}

export type UserGroupsAction = LoadUserGroupAction | LoadUserGroupSuccessAction;
