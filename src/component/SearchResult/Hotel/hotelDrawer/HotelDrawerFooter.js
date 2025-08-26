import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useSelector, useDispatch } from "react-redux";

import { AddToCart } from "@/src/store/slices/BookingflightSlice";
import { setSelectedhotelKey } from "@/src/store/slices/HotelSlice";

const HotelDrawerFooter = ({ hotel }) => {
  const dispatch = useDispatch();

  const selectedhotelkey = useSelector(
    (state) => state.hotel?.selectedhotelKey
  );
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);

  // Calculate number of nights
  const checkIn = new Date(hotel?.checkIn);
  const checkOut = new Date(hotel?.checkOut);
  const nights =
    hotel?.checkIn && hotel?.checkOut
      ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 1;

  // Prices
  const totalPrice = Number(hotel?.totalNet) || 0;
  const perNightPrice = nights > 0 ? totalPrice / nights : totalPrice;

  console.log("hotel_minRate", hotel?.minRate);

  const handleSelectStay = () => {
    if (!hotel) return;
    const rateKey = hotel?.rooms?.[0]?.rates?.[0]?.rateKey;
    dispatch(setSelectedhotelKey(rateKey));

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

  return (
    <>
      <Divider className={`${styles.Divider} Divider`} />
      <Box px={3} className={styles.checkoutDrowerFooter} width={"100%"}>
        <Box py={2} display="flex" flexDirection="column">
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
                {currencySymbols[hotel?.currency]} {Math.round(perNightPrice)} /
                night
              </h4>
              <Typography variant="body2" className="gray f12">
                {currencySymbols[hotel?.currency]} {Math.round(totalPrice)}{" "}
                total ({nights} nights)
              </Typography>
            </Box>

            {/* Actions Section */}
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
                  onClick={handleSelectStay}
                  className={
                    styles.selectFlightBtn + " btn btn-primary btn-round btn-sm"
                  }
                >
                  Select stay
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HotelDrawerFooter;
