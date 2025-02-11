import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
} from "../constants";

import { getProductService } from "../service/GetProductService";

export const GetProductAction = (params) => {
  return (dispatch) => {
    dispatch(requestGetProduct(params));
    getProductService
      .getProduct(params)
      .then((response) => {
        if (response.error && response.error.status === 401) {
          dispatch(getProductError(response.error));
        } else {
          dispatch(getProductSuccess(response));
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        dispatch(getProductError(error));
      });
  };

  function requestGetProduct(params) {
    return { type: GET_PRODUCT_REQUEST, params };
  }

  function getProductSuccess(response) {
    return { type: GET_PRODUCT_SUCCESS, response };
  }

  function getProductError(response) {
    return { type: GET_PRODUCT_ERROR, response };
  }
};
