import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '../category';

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<
  Category
>({
  selectId: model => model.id,
  sortComparer: (a: Category, b: Category): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Category> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = categoryAdapter.getInitialState({
  isLoading: false,
  error: null
});
