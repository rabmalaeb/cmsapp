import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Brand } from '../brand';

export const brandAdapter: EntityAdapter<Brand> = createEntityAdapter<
  Brand
>({
  selectId: model => model.id,
  sortComparer: (a: Brand, b: Brand): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Brand> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
  total?: number;
}

export const initialState: State = brandAdapter.getInitialState({
  isLoading: false,
  error: null
});
