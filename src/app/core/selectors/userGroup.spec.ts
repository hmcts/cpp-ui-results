import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { AppState, reducers } from '../reducers';
import { UserGroup, getUserGroups, UsersGroupsActions } from '@cpp/users-groups';
import { provideHttpClient } from '@angular/common/http';

let store: Store<AppState>;

describe('UserGroup selectors', () => {
  const mockUserGroup = <UserGroup[]>[{ groupName: 'Police Admin' }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideStore(reducers, { runtimeChecks: {} }), provideHttpClient()],
      teardown: { destroyAfterEach: false }
    });
    store = TestBed.inject(Store);
  });

  it('should return the userGroup of the user', () => {
    let result = null;
    store.select(getUserGroups).subscribe((value) => (result = value));
    expect(result).toEqual(undefined);
    store.dispatch(UsersGroupsActions.setUserGroups({ userGroups: mockUserGroup }));
    expect(result).toEqual(mockUserGroup);
  });
});
