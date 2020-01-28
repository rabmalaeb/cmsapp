import { productAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function productReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return productAdapter.addAll(action.payload.items, {
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
    case ActionTypes.GET_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        actionError: null
      };
    }
    case ActionTypes.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        actionError: null
      };
    }
    case ActionTypes.GET_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_PRODUCT_SUCCESS: {
      return productAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_PRODUCT_SUCCESS: {
      return productAdapter.updateOne({id: action.payload.id, changes: action.payload.item}, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.UPDATE_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.DELETE_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_PRODUCT_SUCCESS: {
      return productAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_PRODUCT_FAILURE: {
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
