import React, { useState } from "react";
import { Box, Typography, Divider, Grid, Drawer } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setRoomDrawer } from "@/src/store/slices/HotelSlice";
import HotelDrawerGallery from "../hotelDrawer/HotelDrawerGallery";
import RoomDrawerCard from "./RoomDrawerCard";
import RoomDrawerFooter from "./RoomDrawerFooter";

const RoomDrawer = () => {
  const dispatch = useDispatch();
  const [selectedRateKey, setSelectedRateKey] = useState(null);

  const HandlecloseDrawer = () => {
    setSelectedRateKey(null);
    dispatch(setRoomDrawer(false));
  };
  const isDrawer = useSelector((state) => state.hotel.roomDrawer);
  const hotel = useSelector((state) => state?.hotel?.singlehotel);

  return (
    <Drawer
      anchor="right"
      open={isDrawer}
      onClose={HandlecloseDrawer}
      className={styles.checkoutDrower}
      transitionDuration={300}
    >
      <Box className={`${styles.checkoutDrower} ${styles.hotelDrawer} white-bg`} width={463}>
        <Box className={styles.checkoutDrowerSection + " white-bg"} px={3}>
          <Box className={styles.checkoutDrowerHeder} py={3}>
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

            <Box mt={2} mb={2}>
              <Typography variant="h6" className="regular mb-0">
                Select room
              </Typography>
              <Divider className={`${styles.Divider} Divider`} />
            </Box>
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
                        onSelect={setSelectedRateKey}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Box>
        </Box>
        <RoomDrawerFooter hotel={hotel} selectedRateKey={selectedRateKey} />
      </Box>
    </Drawer>
  );
};

export default RoomDrawer;
