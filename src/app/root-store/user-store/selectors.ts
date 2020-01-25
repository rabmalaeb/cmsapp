import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { userAdapter, State } from './state';
import { User } from 'src/app/modules/user/user';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('myFeature');

export const selectAllUserItems: (
  state: object
) => User[] = userAdapter.getSelectors(selectUserState).selectAll;

export const selectUserById = (id: string) =>
  createSelector(this.selectAllUserItems, (allUsers: User[]) => {
    if (allUsers) {
      return allUsers.find(p => p.id.toString() === id);
    } else {
      return null;
    }
  });

export const selectUserError: MemoizedSelector<object, any> = createSelector(
  selectUserState,
  getError
);

export const selectUserIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectUserState, getIsLoading);
