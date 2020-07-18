import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Country } from '../country';

export const countryAdapter: EntityAdapter<Country> = createEntityAdapter<
  Country
>({
  selectId: model => model.id,
  sortComparer: (a: Country, b: Country): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Country> {
  isLoading?: boolean;
  loadingError?: any;
}

export const initialState: State = countryAdapter.getInitialState({
  isLoading: false,
  error: null
});
