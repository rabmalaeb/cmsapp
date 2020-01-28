import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LanguageKey } from '../languageKey';

export const languageKeyAdapter: EntityAdapter<
  LanguageKey
> = createEntityAdapter<LanguageKey>({
  selectId: model => model.id,
  sortComparer: (a: LanguageKey, b: LanguageKey): number =>
    b.name.toString().localeCompare(a.name.toString())
});

export interface State extends EntityState<LanguageKey> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = languageKeyAdapter.getInitialState({
  isLoading: false,
  error: null
});
