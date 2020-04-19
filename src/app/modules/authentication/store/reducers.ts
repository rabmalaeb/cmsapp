import { initialState, State } from './state';
import { Actions, ActionTypes } from './actions';

export function AuthenticationReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoginRequestLoading: true,
        loginError: null
      };
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        admin: action.payload.item,
        isLoginRequestLoading: false,
        loginError: null
      };
    }
    case ActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLoginRequestLoading: false,
        loginError: action.payload.error
      };
    }

    case ActionTypes.RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isResetPasswordRequestLoading: true,
        resetPasswordError: null
      };
    }
    case ActionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetPasswordRequestLoading: false,
        resetPasswordError: null
      };
    }
    case ActionTypes.RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isResetPasswordRequestLoading: false,
        resetPasswordError: action.payload.error
      };
    }

    case ActionTypes.SET_PASSWORD_REQUEST: {
      return {
        ...state,
        isSetPasswordRequestLoading: true,
        setPasswordError: null
      };
    }
    case ActionTypes.SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSetPasswordRequestLoading: false,
        setPasswordError: null
      };
    }
    case ActionTypes.SET_PASSWORD_FAILURE: {
      return {
        ...state,
        isSetPasswordRequestLoading: false,
        setPasswordError: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
