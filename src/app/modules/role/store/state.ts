import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Role } from '../role';

export const roleAdapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  selectId: model => model.id,
  sortComparer: (a: Role, b: Role): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Role> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = roleAdapter.getInitialState({
  isLoading: false,
  error: null
});
