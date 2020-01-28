import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Admin } from '../admin';

export const adminAdapter: EntityAdapter<Admin> = createEntityAdapter<Admin>({
  selectId: model => model.id,
  sortComparer: (a: Admin, b: Admin): number =>
    b.name.toString().localeCompare(a.name.toString())
});

export interface State extends EntityState<Admin> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = adminAdapter.getInitialState({
  isLoading: false,
  error: null
});
