import { REGISTER, VERIFY_OTP } from "../api";
import Http from "../Http";
import Cookies from "js-cookie";

export const registerService = {
  register,
};

function register(params) {
  params.registration_source = `WEB-${window.location.href}`;
  return Http.post(REGISTER, params)
    .then((response) => {
      const data = response.data;
      const token = data.data.token;
      const twoFactorCode = data.data.user.two_factor_code;
      const params = {
        two_factor_code: twoFactorCode.toString(),
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      Http.post(VERIFY_OTP, params, config).then((resp) => {
        Cookies.set("token", token);
        window.location.href = "/";
      });
      return {
        data,
        params: params,
      };
    })
    .catch((error) => {
      const response = error.response;
      console.log("error:: ", response);
      return { data: response.data };
    });
}
