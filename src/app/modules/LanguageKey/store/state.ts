import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LanguageKey } from '../languagekey';

export const languagekeyAdapter: EntityAdapter<LanguageKey> = createEntityAdapter<LanguageKey>({
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

export const initialState: State = languagekeyAdapter.getInitialState({
  isLoading: false,
  error: null
});
