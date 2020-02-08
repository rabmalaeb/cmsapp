import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Language } from '../language';

export const languageAdapter: EntityAdapter<Language> = createEntityAdapter<
  Language
>({
  selectId: model => model.id,
  sortComparer: (a: Language, b: Language): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Language> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = languageAdapter.getInitialState({
  isLoading: false,
  error: null
});
