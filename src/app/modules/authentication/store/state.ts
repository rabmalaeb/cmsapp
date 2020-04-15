import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Admin } from '../../admin/admin';

export const LoginAdapter: EntityAdapter<
  Admin
> = createEntityAdapter<Admin>({
  selectId: model => model.id,
});

export interface State extends EntityState<Admin> {
  admin: Admin;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = LoginAdapter.getInitialState({
  admin: null,
  isLoading: false,
  error: null
});
