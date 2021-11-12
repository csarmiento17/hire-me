import {
  JOB_SEARCH_REQUEST,
  JOB_SEARCH_SUCCESS,
  JOB_SEARCH_ERROR,
} from "./../constants";

export const INITIAL_STATE = {
  jobs: [],
  loading: true,
  error: false,
};

export const jobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JOB_SEARCH_REQUEST:
      return {
        loading: true,
      };
    case JOB_SEARCH_SUCCESS:
      return {
        loading: false,
        jobs: action.payload,
      };
    case JOB_SEARCH_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
