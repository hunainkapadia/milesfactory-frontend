import {
  GET_MY_PRODUCT_REQUEST,
  GET_MY_PRODUCT_ERROR,
  GET_MY_PRODUCT_SUCCESS,
} from "../constants";

import { GetMyProductService } from "../service/GetMyProductService";

export const GetMyProductAction = (params) => {
  return (dispatch) => {
    dispatch(requestGetMyProduct(params));
    GetMyProductService.getMyProduct(params)
      .then((response) => {
        if (response.error && response.error.status === 401) {
          dispatch(getMyProductError(response.error));
        } else {
          dispatch(getMyProductSuccess(response));
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        dispatch(getMyProductError(error));
      });
  };

  function requestGetMyProduct(params) {
    return { type: GET_MY_PRODUCT_REQUEST, params };
  }

  function getMyProductSuccess(response) {
    return { type: GET_MY_PRODUCT_SUCCESS, response };
  }

  function getMyProductError(response) {
    return { type: GET_MY_PRODUCT_ERROR, response };
  }
};
