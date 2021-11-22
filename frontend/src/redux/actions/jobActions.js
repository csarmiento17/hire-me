import {
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  GET_ALL_JOB,
} from "./../constants";

export function applyJobRequest(data) {
  console.log("Action applyJobRequest ");
  return {
    type: APPLY_JOB_REQUEST,
    payload: data,
  };
}

export function applyJobSuccess(data) {
  return {
    type: APPLY_JOB_SUCCESS,
    payload: data,
  };
}

export function applyJobError(data) {
  return {
    type: APPLY_JOB_ERROR,
    payload: data,
  };
}

export function getAllJob(data) {
  console.log("Action get all job ", data);
  return {
    type: GET_ALL_JOB,
    payload: data,
  };
}
