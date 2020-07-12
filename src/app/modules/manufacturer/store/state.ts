import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Manufacturer } from '../manufacturer';

export const languageAdapter: EntityAdapter<Manufacturer> = createEntityAdapter<
  Manufacturer
>({
  selectId: model => model.id,
  sortComparer: (a: Manufacturer, b: Manufacturer): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Manufacturer> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
  total?: number;
}

export const initialState: State = languageAdapter.getInitialState({
  isLoading: false,
  error: null
});
