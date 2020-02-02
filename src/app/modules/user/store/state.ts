import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../user';

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: model => model.id,
  sortComparer: (a: User, b: User): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<User> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = userAdapter.getInitialState({
  isLoading: false,
  error: null
});
