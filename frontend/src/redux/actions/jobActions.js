import {
  JOB_SEARCH_REQUEST,
  JOB_SEARCH_SUCCESS,
  JOB_SEARCH_ERROR,
} from "./../constants";

export function jobSearchRequest(search) {
  return {
    type: JOB_SEARCH_REQUEST,
    search,
  };
}

export function jobSearchSuccess(data) {
  return {
    type: JOB_SEARCH_SUCCESS,
    payload: data,
  };
}

export function jobSearchError(data) {
  return {
    type: JOB_SEARCH_ERROR,
    payload: data,
  };
}
