import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  AddToCart,
  setHotelDrawer,
} from "@/src/store/slices/BookingflightSlice";
import { setRoomDrawer, setSelectedhotelCode, setSelectedhotelKey } from "@/src/store/slices/HotelSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils"; // import utility

const RoomDrawerFooter = ({ hotel, selectedRateKey }) => {
   
   

  const dispatch = useDispatch();
  const selectedhotelkey = useSelector(
    (state) => state.hotel?.selectedhotelKey
  );
  const selectedRoom = useSelector(
    (state) => state.hotel?.selectedRoom
  );
  
  
  
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const allHotel = useSelector((state) => state?.hotel?.allHotels);

  // Use the helper function
  const { nights, totalPrice, perNightPrice } = calculateHotelPricing(
    hotel,
    allHotel
  );

  
  
  console.log("hotel_code1111", hotel.code);
  
  const handleSelectStay = () => {
    if (!hotel) return;
    dispatch(setSelectedhotelKey(selectedRateKey));
    dispatch(setSelectedhotelCode(hotel.code))
    dispatch(setRoomDrawer(false))

    const params = {
      chat_thread_uuid: uuid,
      offer_type: "hotel",
      offer_id: selectedRateKey,
      price: hotel?.minRate,
      currency: hotel?.currency,
      raw_data: {},
    };
    dispatch(AddToCart(params, uuid));
  };

  const HandlecloseDrawer = () => {
    dispatch(setRoomDrawer(false));
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
            
              {selectedRoom?.total_netamount_with_markup ? (
                <>
                  <h4 className={styles.price + " exbold mb-0 basecolor-dark"}>
                    {currencySymbols[hotel?.currency]}
                    {Math.round(selectedRoom?.total_netamount_with_markup)}{" "}
                    total
                  </h4>
                </>
              ) : (
                "-"
              )}
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
                    disabled={!selectedRateKey} //  Disabled when nothing is selected
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
