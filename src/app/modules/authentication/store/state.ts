import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Admin } from '../../admin/admin';

export const AuthenticationAdapter: EntityAdapter<
  Admin
> = createEntityAdapter<Admin>({
  selectId: model => model.id,
});

export interface State extends EntityState<Admin> {
  admin: Admin;
  isLoginRequestLoading?: boolean;
  loginError?: any;
  isResetPasswordRequestLoading: boolean;
  resetPasswordError: any;
  isSetPasswordRequestLoading: boolean;
  setPasswordError: any;
}

export const initialState: State = AuthenticationAdapter.getInitialState({
  admin: null,
  isLoginRequestLoading: false,
  loginError: null,
  isResetPasswordRequestLoading: false,
  resetPasswordError: null,
  isSetPasswordRequestLoading: false,
  setPasswordError: null,
});
