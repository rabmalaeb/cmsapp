import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Translation } from '../translation';

export const translationAdapter: EntityAdapter<Translation> = createEntityAdapter<Translation>({
  selectId: model => model.id,
  sortComparer: (a: Translation, b: Translation): number =>
    b.id.toString().localeCompare(a.id.toString())
});

export interface State extends EntityState<Translation> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = translationAdapter.getInitialState({
  isLoading: false,
  error: null
});
