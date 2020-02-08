import { languageAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function languageReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return languageAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
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
      return {
        ...state,
        isLoadingItem: false,
        actionError: null
      };
    }
    case ActionTypes.GET_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingItem: false,
        actionError: action.payload.error
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
      return languageAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
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
      return languageAdapter.updateOne(
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
        actionError: action.payload.error
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
      return languageAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_LANGUAGE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
