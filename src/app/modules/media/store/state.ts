import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Media } from '../media';

export const mediaAdapter: EntityAdapter<Media> = createEntityAdapter<
  Media
>({
  selectId: model => model.id,
  sortComparer: (a: Media, b: Media): number => (a.id > b.id ? 1 : 0)
});

export interface State extends EntityState<Media> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  isLoadingItem?: boolean;
  loadingError?: any;
  actionError?: any;
}

export const initialState: State = mediaAdapter.getInitialState({
  isLoading: false,
  error: null
});
