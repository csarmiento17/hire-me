import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from "../constants.js";

export function loginRequest(email, password) {
  return {
    type: USER_LOGIN_REQUEST,
    email,
    password,
  };
}

export function loginSuccess(data) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
  };
}

export function loginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
  };
}
