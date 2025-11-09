import React, { useEffect } from "react";
import { Box, Typography, Divider, Grid, Drawer, Stack } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  hotelSingle,
  setRoomDrawer,
  setSelectedRateKey,
  setSelectedRoom,
} from "@/src/store/slices/HotelSlice";
import HotelDrawerGallery from "../hotelDrawer/HotelDrawerGallery";
import RoomDrawerCard from "./RoomDrawerCard";
import RoomDrawerFooter from "./RoomDrawerFooter";
import { capitalizeFirstWord } from "@/src/utils/utils";
import { setCartTotalPrice } from "@/src/store/slices/BookingflightSlice";

const RoomDrawer = () => {
  const dispatch = useDispatch();
  
  const {selectedRateKey} = useSelector((state) => state.hotel);

  
  
  const isDrawer = useSelector((state) => state.hotel.roomDrawer);
  const hotel = useSelector((state) => state.hotel.singlehotel);
  
  const passengers = useSelector(
    (state) =>
      state?.sendMessage?.SearchHistorySend?.hotel?.passengers ||
      state?.getMessages?.SearchHistory?.hotel?.HotelArgument || null
  );
  
  
  


  
  

  
  
  

  //  properly dispatch when closing drawer
  const HandlecloseDrawer = () => {
    dispatch(setSelectedRateKey(null));
    dispatch(setRoomDrawer(false));
  };

  //  function that dispatches rate selection
  const handleSelectRate = (rates) => {
    
    dispatch(setSelectedRateKey(rates?.rateKey));
    dispatch(setSelectedRoom(rates));
    dispatch(hotelSingle(selectedRateKey))
  };

  const CartData = useSelector((state) => state.booking?.getCartDetail);
  const hotelType = CartData?.items?.find(getitem => getitem.offer_type  === "hotel");
  const flightType = CartData?.items?.find(getitem => getitem.offer_type  === "flight");
  
  const hotelPrice = parseFloat(hotelType?.raw_data?.hotel?.total_netamount_with_markup || hotelType?.raw_data?.hotel?.price || 0);
  const flightPrice = parseFloat(flightType?.price || 0);
  const total = hotelPrice + flightPrice
  useEffect(()=> {
    dispatch(setCartTotalPrice(total));
  },[dispatch, total])
  const CartTotalPrice = useSelector((state) => state?.booking?.cartTotalPrice);
  
  

  return (
    <Drawer
      anchor="right"
      open={isDrawer}
      onClose={HandlecloseDrawer}
      className={styles.checkoutDrower}
      transitionDuration={300}
    >
      <Box
        className={`${styles.checkoutDrower} ${styles.hotelDrawer} white-bg`}
        width={463}
      >
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box className={styles.checkoutDrowerHeder + " header"} pt={3} mb={0}>
            <Box
              className="bold basecolor1 btn-link cursor-pointer"
              onClick={HandlecloseDrawer}
              display="flex"
              gap={1}
              alignItems="center"
            >
              <i className="fa fa-arrow-left fas"></i>
              <Box component="span">Back to Mylz Chat</Box>
            </Box>

            <Box mt={2} pb={2}>
              <Typography variant="h6" className="regular mb-0">
                {`Select room at ${hotel?.name} for ${
                  // If adults exist, show adults count
                  passengers?.adults
                    ? `${passengers?.adults} ${
                        passengers?.adults > 1 ? "adults" : "adult"
                      }`
                    : ""
                }${
                  // If children or infants exist, show them too
                  passengers?.children?.length || passengers?.infants?.length
                    ? ` and ${
                        // Total children = children count + infants count
                        (passengers?.children?.length || 0) +
                        (passengers?.infants?.length || 0)
                      } ${
                        // Check plural or singular
                        (passengers?.children?.length || 0) +
                          (passengers?.infants?.length || 0) >
                        1
                          ? "children"
                          : "child"
                      }`
                    : ""
                }
`}
              </Typography>
            </Box>
            <Divider className={`${styles.Divider} Divider`} />
          </Box>

          <Box className={styles.checkoutDrowerBody}>
            <Grid className={styles.detailsSection}>
              <Box component="section" className="w-100">
                {hotel?.rooms?.map((room) => (
                  <>
                    <Box key={room.name} mb={3}>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        mb={2}
                        gap={1}
                      >
                        <svg
                          width="20"
                          height="13"
                          viewBox="0 0 20 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.400024 12.1431V6.74307C0.400024 6.30973 0.504191 5.9014 0.712524 5.51807C0.920858 5.13473 1.21669 4.8514 1.60002 4.66807V2.54307C1.60002 1.8764 1.83336 1.30973 2.30002 0.843066C2.76669 0.3764 3.33336 0.143066 4.00002 0.143066H8.50002C8.78602 0.143066 9.05336 0.1889 9.30202 0.280566C9.55069 0.372233 9.78336 0.509733 10 0.693066C10.2167 0.509733 10.4494 0.372233 10.698 0.280566C10.9467 0.1889 11.214 0.143066 11.5 0.143066H16C16.6667 0.143066 17.2334 0.3764 17.7 0.843066C18.1667 1.30973 18.4 1.8764 18.4 2.54307V4.66807C18.7834 4.8514 19.0792 5.13473 19.2875 5.51807C19.4959 5.9014 19.6 6.30973 19.6 6.74307V12.1431H17.8V10.3431H2.20002V12.1431H0.400024ZM10.9 4.34307H16.6V2.54307C16.6 2.37307 16.5425 2.23057 16.4275 2.11557C16.3125 2.00057 16.17 1.94307 16 1.94307H11.5C11.33 1.94307 11.1875 2.00057 11.0725 2.11557C10.9575 2.23057 10.9 2.37307 10.9 2.54307V4.34307ZM3.40002 4.34307H9.10002V2.54307C9.10002 2.37307 9.04252 2.23057 8.92752 2.11557C8.81252 2.00057 8.67002 1.94307 8.50002 1.94307H4.00002C3.83002 1.94307 3.68752 2.00057 3.57252 2.11557C3.45752 2.23057 3.40002 2.37307 3.40002 2.54307V4.34307ZM2.20002 8.54307H17.8V6.74307C17.8 6.57307 17.7425 6.43057 17.6275 6.31557C17.5125 6.20057 17.37 6.14307 17.2 6.14307H2.80002C2.63002 6.14307 2.48752 6.20057 2.37252 6.31557C2.25752 6.43057 2.20002 6.57307 2.20002 6.74307V8.54307Z"
                            fill="black"
                          />
                        </svg>

                        <Typography className="bold capitalize">
                          {capitalizeFirstWord(room?.name)} -{" "}
                          {room.rates[0].allotment}
                          {" Available"}
                        </Typography>
                      </Stack>

                      <HotelDrawerGallery roomCode={room?.code} hotel={hotel} />

                      {room.rates
                        .filter(
                          (rate) =>
                            rate.packaging === false &&
                            rate.rateType === "BOOKABLE"
                        )
                        .map((rate) => (
                          <RoomDrawerCard
                            key={rate.rateKey}
                            getrates={rate}
                            hotel={hotel}
                            selectedRateKey={selectedRateKey}
                            onSelect={handleSelectRate}
                          />
                        ))}
                    </Box>
                  </>
                ))}
              </Box>
            </Grid>
          </Box>
        </Box>

        {/*  pass selectedRateKey for footer button disable */}
        <RoomDrawerFooter hotel={hotel} selectedRateKey={selectedRateKey} />
      </Box>
    </Drawer>
  );
};

export default RoomDrawer;
