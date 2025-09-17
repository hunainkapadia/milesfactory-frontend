import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  bookFlight,
  closeDrawer,
  setBookingDrawer,
  setCloseDrawer,
  setflightDetail,
  setSelectedFlightKey,
  setSelectFlightKey,
  setSingleFlightData,
} from "@/src/store/slices/BookingflightSlice";
import { setMessage } from "@/src/store/slices/sendMessageSlice";
import {
  PassengerForm,
  setisLoading,
  setPassengerData,
} from "@/src/store/slices/passengerDrawerSlice";
import { currencySymbols, event } from "@/src/utils/utils";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";

const BookingDrawerFooter = ({ getFlightDetails }) => {
  const dispatch = useDispatch();
  const IsOpendrawer = useSelector((state) => state.booking.bookingDrawer);
  const HandlecloseDrawer = () => {
    dispatch(setBookingDrawer(false)); //setSelectFlightKey empty then close drawer
  };

  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm); //from order api
  const passengerSelected = useSelector((state) => state?.sendMessage);


  const offerkey = useSelector((state) => state?.booking?.offerkeyforDetail);
  // ✅ Move here (component scope)
  const isCartItem = useSelector(
    (state) => state.booking?.getCartDetail?.items
  );
  console.log("isCartItem", isCartItem);
  
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const handleBookFlight = () => {
    dispatch(setBookingDrawer(false));
    event({
      action: "click",
      category: "engagement",
      label: "Select Flight Drawer",
      value: getFlightDetails?.total_amount_rounded,
    });
    const params = {
      chat_thread_uuid: uuid,
      offer_type: "flight",
      offer_id: getFlightDetails?.id,
      price: getFlightDetails?.total_amount_plus_markup,
      currency: getFlightDetails?.total_currency,
      raw_data: {},
    };
    dispatch(AddToCart(params, uuid));
  };

  const personQuantity = getFlightDetails?.passengers.length;
  const Passengers =
    Number(getFlightDetails?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(getFlightDetails?.tax_amount) + Passengers;
  const totalAmount = Math.round(WithtaxAmount);

  // for button show hide logic when normal message or flights
  const isFunction_state = useSelector(
    (state) => state?.sendMessage?.IsFunction?.status
  );

  const IsPassengerflow = useSelector(
    (state) => state?.passengerDrawer?.IsPassengerflow
  );

  return (
    <>
      <Divider className={`${styles.Divider} Divider`} />
      <Box
        px={3}
        className={styles.checkoutDrowerFooter + " test11"}
        width={"100%"}
      >
        {/* Footer Content */}
        <Box py={2} display="flex" flexDirection="column">
          {/* TODO: This will become dynamic based on airline cancellation policy */}
          <Box
            component={"section"}
            display={"flex"}
            alignItems={"center"}
            pb={2}
            gap={"5px"}
          >
            <Box class="imggroup" display={"flex"}>
              <img
                src="/images/protection-text-icon.svg"
                alt="Protection Icon"
                width="15"
              />
            </Box>
            <Typography
              variant="p"
              className="gray f12"
              display={{ lg: "block", md: "block", xs: "none" }}
            >
              The airline policy will apply if you decide to cancel or modify
              your trip.
            </Typography>
            <Typography
              variant="p"
              className="gray f12"
              display={{ lg: "none", md: "none", xs: "block" }}
            >
              Airline-direct booking - protected from airline disruptions.
            </Typography>
          </Box>

          {/* Price Row */}
          <Box
            className={styles.priceRow + " aaa"}
            display="flex"
            justifyContent={"space-between"}
            width={"100%"}
          >
            {/* Price Section */}
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
            >
              <Box
                className={styles.priceSection}
                display="flex"
                alignItems="center"
              >
                <h4 className={styles.price + " exbold mb-0 basecolor-dark"}>
                  <span>
                    {currencySymbols[getFlightDetails?.tax_currency] ||
                      getFlightDetails?.tax_currency}
                    {Math.round(getFlightDetails?.per_passenger_amount_rounded)}
                  </span>
                </h4>
              </Box>
              {personQuantity > 1 && (
                <Box className={styles.totalPersonPrice}>
                  <Typography variant="p" className=" gray f12">
                    {currencySymbols[getFlightDetails?.tax_currency] ||
                      getFlightDetails?.tax_currency}
                    {Math.round(getFlightDetails?.total_amount_rounded)} total
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Actions Section */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={0}
            >
              {/* Close Button */}
              <Box
                display="flex"
                alignItems="center"
                textAlign={"center"}
                className="gray f14"
                style={{ cursor: "pointer" }}
                onClick={HandlecloseDrawer}
              >
                <span>Close</span>
              </Box>

              {/* Select Flight Button */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="basecolor1"
              >
                {/* IsPassengerflow !== true */}
                {/* {isFunction_state !== true ? (
                  <>
                    <button
                      className={
                        styles.selectFlightBtn +
                        " btn btn-primary btn-sm btn-round"
                      }
                      onClick={handleBookFlight}
                    >
                      <Box display="flex" gap={1}>
                        <Box>Select flight</Box>
                      </Box>
                    </button>
                  </>
                ) : isFunction_state !== true && IsPassengerflow !== true ? (
                  <>
                  </>
                ) : (
                  ""
                )} */}

                <Button
                  sx={{ ml: 3 }}
                  className={
                    styles.selectFlightBtn +
                    " btn btn-primary btn-round btn-sm"
                  }
                  onClick={handleBookFlight}
                  disabled={isCartItem?.length > 0}
                >
                  <Box display="flex" gap={1}>
                    <Box>Select flight</Box>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BookingDrawerFooter;
