import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  UserStoreSelectors
} from './user-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  UserStoreSelectors.selectUserError,
  (user: string) => {
    return user;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UserStoreSelectors.selectUserIsLoading,
  (myFeature: boolean) => {
    return myFeature;
  }
);


//https://itnext.io/ngrx-best-practices-for-enterprise-angular-applications-6f00bcdf36d7
