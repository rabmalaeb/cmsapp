import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../product';

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<
  Product
>({
  selectId: model => model.id,
  sortComparer: (a: Product, b: Product): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Product> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = productAdapter.getInitialState({
  isLoading: false,
  error: null
});
