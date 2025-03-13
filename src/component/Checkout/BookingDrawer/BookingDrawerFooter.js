import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bookFlight,
  closeDrawer,
  setCloseDrawer,
  setflightDetail,
  setPassengerData,
  setselectedFlighDetail,
  setSelectFlightKey,
} from "@/src/store/slices/BookingflightSlice";
import { setMessage } from "@/src/store/slices/sendMessageSlice";

const BookingDrawerFooter = ({ getFlightDetails }) => {
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    
    dispatch(setCloseDrawer()); // Pass an empty value to close the drawer

  };

  const PassengerData = useSelector((state) => state.booking);
  console.log("PassengerData", PassengerData);

  const handleBookFlight = () => {
    dispatch(setCloseDrawer()); //dispatch close
    dispatch(setflightDetail(getFlightDetails)); //dispatch selected flight id

    dispatch(setPassengerData());
    if (getFlightDetails?.id) {
      dispatch(bookFlight(getFlightDetails.id)); // Pass flight ID to bookFlight
    } else {
      console.error("Flight ID is missing");
    }
    dispatch(setMessage({ ai: { response: "passengerFlowActive" } })); //this si message trigger passenger flow active
  };

  return (
    <Box className={styles.checkoutDrowerFooter} position="absolute">
      <Divider />

      {/* Footer Content */}
      <Box
        className={styles.checkoutDrowerHeder}
        py={1}
        px={3}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="p" className="gray f12 p">
          *The airline policy will apply if you decide to cancel or modify your
          trip.
        </Typography>

        {/* Price Row */}
        <Box
          className={styles.priceRow}
          display="flex"
          justifyContent="space-between"
        >
          {/* Price Section */}
          <Box display="flex" flexDirection="column">
            <Box
              className={styles.priceSection}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Typography
                variant="subtitle2"
                className={styles.priceLabel + " mb-0"}
              >
                Price:
              </Typography>
              <Typography
                variant="h3"
                className={styles.price + " h3 mb-0 basecolor1"}
              >
                <span>€ {getFlightDetails?.total_amount}</span>
              </Typography>
            </Box>
            <Box className={styles.totalPersonPrice}>
              <Typography variant="p" className="darkgray f14">
                Total per person: € {getFlightDetails?.per_passenger_amount}
              </Typography>
            </Box>
          </Box>

          {/* Actions Section */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={3}
          >
            {/* Close Button */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              className="basecolor1 f14"
              style={{ cursor: "pointer" }}
              onClick={HandlecloseDrawer}
            >
              <i className="fa fa-close fas"></i> <span>Close</span>
            </Box>

            {/* Select Flight Button */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              className="basecolor1"
            >
              <button
                className={styles.selectFlightBtn + " btn btn-green btn-sm"}
                onClick={handleBookFlight}
              >
                <Box display="flex" gap={1}>
                  <i className="fa fa-arrow-right"></i>{" "}
                  <Box
                    sx={{ display: { md: "block", sm: "block", xs: "none" } }}
                  >
                    Book flight
                  </Box>
                </Box>
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDrawerFooter;
