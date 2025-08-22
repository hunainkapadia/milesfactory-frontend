import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import YourTripSedebarCard from "../YourTripSedebarCard";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";

import Image from "next/image";
import { currencySymbols } from "@/src/utils/utils";
import ShareDropdown from "../../layout/Header/ShareDropdown";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";
import { useEffect } from "react";
import { CartDetail, ListCart } from "@/src/store/slices/BookingflightSlice";
import { PassengerForm } from "@/src/store/slices/passengerDrawerSlice";

const YourTripSidebar = ({ isMessage }) => {
  const getselectedFlight = useSelector(
    (state) => state?.booking?.singleFlightData
  );
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm); //from order api
  
  
  
  


  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  const getSearchUrl = useSelector((state) => state?.sendMessage?.AllOfferUrl);
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const dispatch= useDispatch();
  const handleBookFlight = ()=> {
    dispatch(setChatscroll(true)); // scrol lon click book
    dispatch(PassengerForm());
  }

  
    const CartOfferDetail = useSelector((state) => state.booking?.getCartDetail?.items);
  const CartDetails = CartOfferDetail?.[0];
  

  console.log("CartDetails33", CartOfferDetail);
  
  

  const threadUuid = useSelector((state) => state?.sendMessage?.threadUuid);
  console.log("get__uuid", threadUuid);
  
  
  useEffect(() => {
  if (threadUuid) {
    dispatch(CartDetail(threadUuid));
  }
}, [threadUuid, dispatch]);


  return (
    <>
      {getBuilder && (
        <Box
          className={YourtripStyles.YourTripSidebar}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box className={YourtripStyles.YourTripCard} p={0}>
            <Box
              component={"header"}
              className={YourtripStyles.CardHeader}
              display={"flex"}
              alignItems={"center"}
              position={"relative"}
              zIndex={1}
              justifyContent={"space-between"}
              px={"18px"}
              pt={"20px"}
              pb={"13px"}
            >
              <Box gap={"3px"} display={"flex"} alignItems={"center"}>
                <Box className=" imggroup">
                  <img src="/images/builder-icon.svg" />
                </Box>

                <Typography
                  sx={{ pt: "6px" }}
                  className="basecolor1 mb-0 exbold"
                >
                  Builder
                </Typography>
              </Box>

              {/* <Box
                display={"flex"}
                alignItems={"center"}
                className="basecolor1"
                gap={1}
              >
                <Box className=" imggroup">
                  <Image width={24} height={24} src="/images/share-icon.svg" />
                </Box>
                <Typography className="bold">Share</Typography>
              </Box> */}
              {isMessage && <ShareDropdown />}
            </Box>

            <YourTripSedebarCard isSidebar getBuilder={getBuilder} />

            <Box
              px={"18px"}
              py={"14px"}
              component={"footer"}
              className={YourtripStyles.Footer + " "}
              sx={{ borderTop: " solid 1px  #E6EEEE" }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box>
                  <h4 className="exbold mb-0">
                    {CartDetails ? (
                      <>
                        {currencySymbols[CartDetails.currency] ||
                          CartDetails.currency}
                        {Math.round(CartDetails.price)}
                      </>
                    ) : (
                      "-"
                    )}
                  </h4>

                  <Typography className="gray f12">total</Typography>
                </Box>
                <Button
                  onClick={handleBookFlight}
                  className="btn btn-primary btn-round btn-xs"
                  disabled={orderSuccess || !CartOfferDetail?.length > 0}
                >
                  Book now
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default YourTripSidebar;
