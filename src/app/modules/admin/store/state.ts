import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Admin } from '../admin';

export const adminAdapter: EntityAdapter<Admin> = createEntityAdapter<Admin>({
  selectId: model => model.id,
  sortComparer: (a: Admin, b: Admin): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Admin> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = adminAdapter.getInitialState({
  isLoading: false,
  error: null
});
