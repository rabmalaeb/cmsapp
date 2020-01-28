import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Partner } from '../partner';

export const partnerAdapter: EntityAdapter<Partner> = createEntityAdapter<Partner>({
  selectId: model => model.id,
  sortComparer: (a: Partner, b: Partner): number =>
    b.name.toString().localeCompare(a.name.toString())
});

export interface State extends EntityState<Partner> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = partnerAdapter.getInitialState({
  isLoading: false,
  error: null
});
