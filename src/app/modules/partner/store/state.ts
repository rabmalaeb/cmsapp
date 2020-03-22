import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Partner } from '../partner';

export const partnerAdapter: EntityAdapter<Partner> = createEntityAdapter<
  Partner
>({
  selectId: model => model.id,
  sortComparer: (a: Partner, b: Partner): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Partner> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
  total?: number;
}

export const initialState: State = partnerAdapter.getInitialState({
  isLoading: false,
  error: null
});
