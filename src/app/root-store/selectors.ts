import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserStoreSelectors } from '../modules/user/store';
import { RoleStoreSelectors } from '../modules/role/store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  UserStoreSelectors.selectUserLoadingError,
  RoleStoreSelectors.selectRoleLoadingError,
  (user: string, role: string) => {
    return user || role;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UserStoreSelectors.selectUserIsLoading,
  RoleStoreSelectors.selectRoleIsLoading,
  (user: boolean, role: boolean) => {
    return user || role;
  }
);

//https://itnext.io/ngrx-best-practices-for-enterprise-angular-applications-6f00bcdf36d7
