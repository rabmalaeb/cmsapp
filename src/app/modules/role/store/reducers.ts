import { roleAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function roleReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      console.log('we are here');
      
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return roleAdapter.addAll(action.payload.items, {
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
    case ActionTypes.GET_ROLE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        actionError: null
      };
    }
    case ActionTypes.GET_ROLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        actionError: null
      };
    }
    case ActionTypes.GET_ROLE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.ADD_ROLE_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_ROLE_SUCCESS: {
      return roleAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_ROLE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.UPDATE_ROLE_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_ROLE_SUCCESS: {
      return roleAdapter.updateOne({id: action.payload.id, changes: action.payload.item}, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.UPDATE_ROLE_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.DELETE_ROLE_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_ROLE_SUCCESS: {
      return roleAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_ROLE_FAILURE: {
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