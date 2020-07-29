import { manufacturerAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function manufacturerReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return manufacturerAdapter.addAll(action.payload.items, {
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
    case ActionTypes.GET_MANUFACTURER_REQUEST: {
      return {
        ...state,
        isLoadingItem: true,
        actionError: null
      };
    }
    case ActionTypes.GET_MANUFACTURER_SUCCESS: {
      return manufacturerAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingItem: false,
        actionError: null
      });
    }
    case ActionTypes.GET_MANUFACTURER_FAILURE: {
      return {
        ...state,
        isLoadingItem: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.ADD_MANUFACTURER_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_MANUFACTURER_SUCCESS: {
      return manufacturerAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_MANUFACTURER_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.UPDATE_MANUFACTURER_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_MANUFACTURER_SUCCESS: {
      return manufacturerAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.item },
        {
          ...state,
          isLoadingAction: false,
          actionError: null
        }
      );
    }
    case ActionTypes.UPDATE_MANUFACTURER_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.DELETE_MANUFACTURER_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_MANUFACTURER_SUCCESS: {
      return manufacturerAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_MANUFACTURER_FAILURE: {
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
