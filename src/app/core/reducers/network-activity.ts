import { NetworkActions, NETWORK_CONNECTIVITY } from '../actions/network-connectivity.action';

export type OnlineState = boolean;

export function onlineReducer(state: boolean = false, action: NetworkActions): boolean {
  switch (action.type) {
    case NETWORK_CONNECTIVITY:
      return action.online;

    default:
      return state;
  }
}
