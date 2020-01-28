import { languagekeyAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function languagekeyReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return languagekeyAdapter.addAll(action.payload.items, {
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
    case ActionTypes.GET_LANGUAGEKEY_REQUEST: {
      return {
        ...state,
        isLoading: true,
        actionError: null
      };
    }
    case ActionTypes.GET_LANGUAGEKEY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        actionError: null
      };
    }
    case ActionTypes.GET_LANGUAGEKEY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.ADD_LANGUAGEKEY_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_LANGUAGEKEY_SUCCESS: {
      return languagekeyAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_LANGUAGEKEY_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.UPDATE_LANGUAGEKEY_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_LANGUAGEKEY_SUCCESS: {
      return languagekeyAdapter.updateOne({id: action.payload.id, changes: action.payload.item}, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.UPDATE_LANGUAGEKEY_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.DELETE_LANGUAGEKEY_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_LANGUAGEKEY_SUCCESS: {
      return languagekeyAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_LANGUAGEKEY_FAILURE: {
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
