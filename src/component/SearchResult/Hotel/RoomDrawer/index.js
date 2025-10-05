import React from "react";
import { Box, Typography, Divider, Grid, Drawer } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setRoomDrawer,
  setSelectedRateKey,
} from "@/src/store/slices/HotelSlice";
import HotelDrawerGallery from "../hotelDrawer/HotelDrawerGallery";
import RoomDrawerCard from "./RoomDrawerCard";
import RoomDrawerFooter from "./RoomDrawerFooter";

const RoomDrawer = () => {
  const dispatch = useDispatch();
  const selectedRateKey = useSelector((state) => state.hotel.selectedRateKey);
  const isDrawer = useSelector((state) => state.hotel.roomDrawer);
  const hotel = useSelector((state) => state.hotel.singlehotel);

  //  properly dispatch when closing drawer
  const HandlecloseDrawer = () => {
    dispatch(setSelectedRateKey(null));
    dispatch(setRoomDrawer(false));
  };

  //  function that dispatches rate selection
  const handleSelectRate = (rateKey) => {
    dispatch(setSelectedRateKey(rateKey));
  };

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
        <Box className={styles.checkoutDrowerSection + " white-bg"} px={3}>
          <Box pt={3} mb={3}>
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
                Select room
              </Typography>
            </Box>
            <Divider className={`${styles.Divider} Divider`} />
          </Box>

          <Box className={styles.checkoutDrowerBody}>
            <Grid container>
              <Box component="section" className="w-100">
                {hotel?.rooms?.map((room) => (
                  <Box key={room.name} mb={3}>
                    <Typography className="bold" mb={2}>
                      {room?.name}
                    </Typography>
                    <HotelDrawerGallery hotel={hotel} />

                    {room.rates.map((rate) => (
                      <RoomDrawerCard
                        key={rate.rateKey}
                        getrates={rate}
                        selectedRateKey={selectedRateKey}
                        onSelect={handleSelectRate} //  dispatch function
                      />
                    ))}
                  </Box>
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
