import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '../category';

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: model => model.id,
  sortComparer: (a: Category, b: Category): number =>
    b.name.toString().localeCompare(a.name.toString())
});

export interface State extends EntityState<Category> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = categoryAdapter.getInitialState({
  isLoading: false,
  error: null
});
