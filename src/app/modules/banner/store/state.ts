import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Banner } from '../banner';

export const bannerAdapter: EntityAdapter<Banner> = createEntityAdapter<
  Banner
>({
  selectId: model => model.id,
  sortComparer: (a: Banner, b: Banner): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Banner> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
  total?: number;
}

export const initialState: State = bannerAdapter.getInitialState({
  isLoading: false,
  error: null
});
