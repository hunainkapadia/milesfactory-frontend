import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  AddToCart,
  setHotelDrawer,
} from "@/src/store/slices/BookingflightSlice";
import { setRoomDrawer, setSelectedhotelKey } from "@/src/store/slices/HotelSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils"; // import utility

const RoomDrawerFooter = ({ hotel, selectedRateKey }) => {
   console.log("selectedRateKey", selectedRateKey);
   
  const dispatch = useDispatch();
  const selectedhotelkey = useSelector(
    (state) => state.hotel?.selectedhotelKey
  );
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const allHotel = useSelector((state) => state?.hotel?.allHotels);

  // Use the helper function
  const { nights, totalPrice, perNightPrice } = calculateHotelPricing(
    hotel,
    allHotel
  );

  const handleSelectStay = () => {
    if (!hotel) return;
    const rateKey = hotel?.rooms?.[0]?.rates?.[0]?.rateKey;
    dispatch(setSelectedhotelKey(rateKey));
    dispatch(setRoomDrawer(false))

    const params = {
      chat_thread_uuid: uuid,
      offer_type: "hotel",
      offer_id: rateKey,
      price: hotel?.minRate,
      currency: hotel?.currency,
      raw_data: {},
    };
    dispatch(AddToCart(params, uuid));
  };

  const HandlecloseDrawer = () => {
    dispatch(setHotelDrawer(false));
  };

  return (
    <>
      <Divider className={`${styles.Divider} Divider`} />
      <Box px={3} className={styles.checkoutDrowerFooter} width={"100%"}>
        <Box py={2} display="flex" flexDirection="column">
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
            className={styles.priceRow}
            display="flex"
            justifyContent={"space-between"}
            width={"100%"}
          >
            {/* Price Section */}
            <Box display="flex" flexDirection="column" justifyContent="center">
              <h4 className={styles.price + " exbold mb-0 basecolor-dark"}>
                {currencySymbols[hotel?.currency]}
                {Math.round(perNightPrice)} / night
              </h4>
              <Typography variant="body2" className="gray f12">
                {currencySymbols[hotel?.currency]}
                {Math.round(totalPrice)} total ({nights} nights)
              </Typography>
            </Box>

            {/* Actions Section */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
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
              <Box display="flex" alignItems="center" gap={2}>
                {selectedhotelkey === hotel?.rooms?.[0]?.rates?.[0]?.rateKey ? (
                  <Button
                    disabled
                    className={
                      styles.IsSelected + " btn btn-primary btn-round btn-sm"
                    }
                  >
                    Selected
                  </Button>
                ) : (
                  <Button
                     disabled={!selectedRateKey} // ✅ Disabled when nothing is selected
                    onClick={handleSelectStay}
                    className={
                      styles.selectFlightBtn +
                      " btn btn-primary btn-round btn-md-x"
                    }
                  >
                    Continue
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RoomDrawerFooter;
