import {
  USER_LOGIN_FAIL,
  USER_LOG_OUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/user';

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOG_OUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user:{}}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};


export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success:true, userInfo: payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};