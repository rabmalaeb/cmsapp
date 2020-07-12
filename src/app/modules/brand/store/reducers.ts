import { brandAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function brandReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return brandAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        total: action.payload.paginator.total,
        loadingError: null
      });
    }
    case ActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loadingError: action.payload.error
      };
    }
    case ActionTypes.GET_LANGUAGE_REQUEST: {
      return {
        ...state,
        isLoadingItem: true,
        actionError: null
      };
    }
    case ActionTypes.GET_LANGUAGE_SUCCESS: {
      return brandAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingItem: false,
        actionError: null
      });
    }
    case ActionTypes.GET_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingItem: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.ADD_LANGUAGE_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_LANGUAGE_SUCCESS: {
      return brandAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.UPDATE_LANGUAGE_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_LANGUAGE_SUCCESS: {
      return brandAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.item },
        {
          ...state,
          isLoadingAction: false,
          actionError: null
        }
      );
    }
    case ActionTypes.UPDATE_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.DELETE_LANGUAGE_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_LANGUAGE_SUCCESS: {
      return brandAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    default: {
      return state;
    }
  }
}
