import { partnerAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function partnerReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return partnerAdapter.addAll(action.payload.items, {
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
    case ActionTypes.GET_PARTNER_REQUEST: {
      return {
        ...state,
        isLoadingItem: true,
        actionError: null
      };
    }
    case ActionTypes.GET_PARTNER_SUCCESS: {
      return partnerAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingItem: false,
        actionError: null
      });
    }
    case ActionTypes.GET_PARTNER_FAILURE: {
      return {
        ...state,
        isLoadingItem: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.ADD_PARTNER_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_PARTNER_SUCCESS: {
      return partnerAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_PARTNER_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.UPDATE_PARTNER_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_PARTNER_SUCCESS: {
      return partnerAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.item },
        {
          ...state,
          isLoadingAction: false,
          actionError: null
        }
      );
    }
    case ActionTypes.UPDATE_PARTNER_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error.message
      };
    }
    case ActionTypes.DELETE_PARTNER_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_PARTNER_SUCCESS: {
      return partnerAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_PARTNER_FAILURE: {
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
