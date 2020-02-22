import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Supplier } from '../supplier';

export const supplierAdapter: EntityAdapter<Supplier> = createEntityAdapter<
  Supplier
>({
  selectId: model => model.id,
  sortComparer: (a: Supplier, b: Supplier): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Supplier> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = supplierAdapter.getInitialState({
  isLoading: false,
  error: null
});
