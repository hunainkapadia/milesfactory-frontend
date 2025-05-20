import { Box, Typography } from "@mui/material";
import style from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "..";
import { useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";

const MobileLoading = () => {
  const Slectedflight = useSelector((state) => state.booking.flightDetail);
  const SlectedflightLoading = useSelector((state) => state.booking);
  console.log("SlectedflightLoading", SlectedflightLoading);
  
   const paymentSuccess = useSelector((state)=> state.payment.PaymentFormSuccess);
  
  return (
    <Box
      className={style.MobileLoadingRow}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        borderRadius={"100px"}
        className={style.MobileLoading + "  white-bg basecolor1"}
        display={"flex"}
        gap={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {/* <Typography className="f14">YOUR TRIP</Typography> */}
        {console.log("paymentSuccess", paymentSuccess)}

        {paymentSuccess ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img width={24} src="/images/success-check.svg" />
            </Box>
            <Typography className="exbold f14">
              {currencySymbols[Slectedflight?.tax_currency] ||
                Slectedflight?.tax_currency}
              {Math.round(Slectedflight?.total_amount)}
            </Typography>
          </Box>
        ) : Slectedflight ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <svg
                width="35"
                height="32"
                viewBox="0 0 35 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3911_30322)">
                  <path
                    d="M25.2768 10.3991C25.2348 10.2361 25.1498 10.0873 25.0307 9.96819C24.9116 9.84913 24.7628 9.76414 24.5998 9.72208L21.7093 8.97673C21.66 8.96273 21.6166 8.93303 21.5857 8.89214C21.5548 8.85124 21.5381 8.80137 21.5381 8.75011C21.5381 8.69885 21.5548 8.64899 21.5857 8.60809C21.6166 8.56719 21.66 8.53749 21.7093 8.52349L24.5998 7.77768C24.7628 7.73565 24.9115 7.65074 25.0306 7.53176C25.1497 7.41278 25.2347 7.26408 25.2768 7.10112L26.0222 4.21066C26.036 4.16115 26.0657 4.11753 26.1066 4.08646C26.1476 4.05539 26.1976 4.03857 26.249 4.03857C26.3004 4.03857 26.3504 4.05539 26.3914 4.08646C26.4323 4.11753 26.462 4.16115 26.4759 4.21066L27.2207 7.10112C27.2628 7.26416 27.3478 7.41296 27.4669 7.53203C27.5859 7.6511 27.7347 7.73608 27.8978 7.77815L30.7882 8.52302C30.8379 8.53673 30.8818 8.56637 30.913 8.60739C30.9442 8.64841 30.9612 8.69855 30.9612 8.75011C30.9612 8.80167 30.9442 8.85181 30.913 8.89283C30.8818 8.93385 30.8379 8.96349 30.7882 8.9772L27.8978 9.72208C27.7347 9.76414 27.5859 9.84913 27.4669 9.96819C27.3478 10.0873 27.2628 10.2361 27.2207 10.3991L26.4754 13.2896C26.4615 13.3391 26.4319 13.3827 26.3909 13.4138C26.35 13.4448 26.3 13.4617 26.2485 13.4617C26.1971 13.4617 26.1471 13.4448 26.1062 13.4138C26.0652 13.3827 26.0355 13.3391 26.0217 13.2896L25.2768 10.3991Z"
                    fill="#01C4CC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9694 2.80469C20.3721 2.80469 20.6986 3.13115 20.6986 3.53385V6.45052C20.6986 6.85323 20.3721 7.17969 19.9694 7.17969C19.5667 7.17969 19.2402 6.85323 19.2402 6.45052V3.53385C19.2402 3.13115 19.5667 2.80469 19.9694 2.80469Z"
                    fill="#01C4CC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.7783 4.99186C17.7783 4.58915 18.1048 4.2627 18.5075 4.2627H21.4242C21.8269 4.2627 22.1533 4.58915 22.1533 4.99186C22.1533 5.39457 21.8269 5.72103 21.4242 5.72103H18.5075C18.1048 5.72103 17.7783 5.39457 17.7783 4.99186Z"
                    fill="#01C4CC"
                  />
                </g>
                <path
                  d="M13.7145 13.5656C13.9844 13.7004 14.282 13.7706 14.5837 13.7706C14.8854 13.7706 15.1829 13.7004 15.4528 13.5656L19.0102 11.7864C19.1585 11.7123 19.3234 11.6773 19.489 11.6849C19.6547 11.6924 19.8156 11.7422 19.9566 11.8295C20.0976 11.9168 20.2139 12.0387 20.2945 12.1836C20.3751 12.3286 20.4172 12.4917 20.417 12.6575V25.067C20.4169 25.2475 20.3666 25.4244 20.2716 25.5779C20.1766 25.7314 20.0408 25.8554 19.8794 25.9361L15.4528 28.1499C15.1829 28.2847 14.8854 28.3549 14.5837 28.3549C14.282 28.3549 13.9844 28.2847 13.7145 28.1499L9.61949 26.1024C9.34961 25.9675 9.05204 25.8973 8.75033 25.8973C8.44862 25.8973 8.15105 25.9675 7.88116 26.1024L4.3238 27.8815C4.17539 27.9557 4.01048 27.9906 3.84474 27.9831C3.67901 27.9755 3.51798 27.9256 3.37697 27.8382C3.23596 27.7508 3.11967 27.6287 3.03915 27.4837C2.95864 27.3386 2.91659 27.1754 2.917 27.0095V14.601C2.91709 14.4205 2.96744 14.2436 3.06239 14.09C3.15735 13.9365 3.29317 13.8125 3.45463 13.7318L7.88116 11.5181C8.15105 11.3832 8.44862 11.313 8.75033 11.313C9.05204 11.313 9.34961 11.3832 9.61949 11.5181L13.7145 13.5656Z"
                  stroke="url(#paint0_linear_3911_30322)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.583 13.771V28.3543"
                  stroke="#1ABCD8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 11.313V25.8963"
                  stroke="#31B6E3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_3911_30322"
                    x1="-8.26356"
                    y1="11.0837"
                    x2="19.076"
                    y2="9.1029"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#6DA3FF" />
                    <stop offset="1" stop-color="#00C4CC" />
                  </linearGradient>
                  <clipPath id="clip0_3911_30322">
                    <rect
                      width="17.5"
                      height="17.5"
                      fill="white"
                      transform="translate(17.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Typography className="exbold f14">
              {currencySymbols[Slectedflight?.tax_currency] ||
                Slectedflight?.tax_currency}
              {Math.round(Slectedflight?.total_amount)}
            </Typography>
          </Box>
        ) : (
          <>
            {/* <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img src="/images/plane-icon-basecolor1.svg" />{" "}
            </Box>
            <Typography className="exbold f14">YOUR TRIP</Typography>
            
         </Box> */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MobileLoading;
