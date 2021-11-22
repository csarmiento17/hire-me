import {
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  GET_ALL_JOB,
} from "../constants";

export const INITIAL_STATE = {
  jobs: [],
  loading: true,
  error: false,
};

export const jobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPLY_JOB_REQUEST:
      console.log("Reducer", action);
      return {
        loading: false,
        jobs: action.payload,
      };
    case APPLY_JOB_SUCCESS:
      return {
        loading: false,
        jobs: action.payload,
      };
    case APPLY_JOB_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ALL_JOB: {
      return {
        loading: false,
        jobs: action.payload,
      };
    }
    default:
      return state;
  }
};
