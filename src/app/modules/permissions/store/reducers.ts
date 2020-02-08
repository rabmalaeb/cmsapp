import { permissionAdapter, initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function permissionReducer(
  state = initialState,
  action: Actions
): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingError: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return permissionAdapter.addAll(action.payload.items, {
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
    case ActionTypes.LOAD_PERMISSIONS_BY_ROLE_REQUEST: {
      return {
        ...state,
        isLoadingPermissionsForRole: true,
        loadingError: null,
        PermissionsForRole: []
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_BY_ROLE_SUCCESS: {
      return {
        ...state,
        isLoadingPermissionsForRole: false,
        isLoadedPermissionsForRole: true,
        loadingError: null,
        PermissionsForRole: action.payload.items
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_BY_ROLE_FAILURE: {
      return {
        ...state,
        isLoadingPermissionsForRole: false,
        loadingError: action.payload.error,
        PermissionsForRole: []
      };
    }
    case ActionTypes.GET_PERMISSION_REQUEST: {
      return {
        ...state,
        isLoadingItem: true,
        actionError: null
      };
    }
    case ActionTypes.GET_PERMISSION_SUCCESS: {
      return {
        ...state,
        isLoadingItem: false,
        actionError: null
      };
    }
    case ActionTypes.GET_PERMISSION_FAILURE: {
      return {
        ...state,
        isLoadingItem: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.ADD_PERMISSION_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.ADD_PERMISSION_SUCCESS: {
      return permissionAdapter.addOne(action.payload.item, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.ADD_PERMISSION_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.UPDATE_PERMISSION_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.UPDATE_PERMISSION_SUCCESS: {
      return permissionAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.item },
        {
          ...state,
          isLoadingAction: false,
          actionError: null
        }
      );
    }
    case ActionTypes.UPDATE_PERMISSION_FAILURE: {
      return {
        ...state,
        isLoadingAction: false,
        actionError: action.payload.error
      };
    }
    case ActionTypes.DELETE_PERMISSION_REQUEST: {
      return {
        ...state,
        isLoadingAction: true,
        actionError: null
      };
    }
    case ActionTypes.DELETE_PERMISSION_SUCCESS: {
      return permissionAdapter.removeOne(action.payload.id, {
        ...state,
        isLoadingAction: false,
        actionError: null
      });
    }
    case ActionTypes.DELETE_PERMISSION_FAILURE: {
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
