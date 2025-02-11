import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../constants";
import { registerService } from "../services/registerService";
export const register = (params) => {
  return (dispatch) => {
    dispatch(requestRegister(params));
    registerService
      .register(params)
      .then((response) => {
        dispatch(registerSuccess(response));
      })
      .catch((error) => {
        dispatch(registerError(error));
      });
  };

  function requestRegister(params) {
    return { type: REGISTER_REQUEST, params };
  }

  function registerSuccess(response) {
    return { type: REGISTER_SUCCESS, response };
  }

  function registerError(response) {
    return { type: REGISTER_ERROR, response };
  }
};
