import React, { useEffect } from "react";
import { Box, Typography, Divider, Grid, Drawer, Stack } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Travelstyles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OriginField from "../OriginField";
import { setTravelFormDrawer } from "@/src/store/slices/TravelSlice";
import DestinationField from "../DestinationField";
import DOBField from "../DOBField";
import Travellers from "../Travellers";

const TravelFormMobileDrawer = ({ errors }) => {
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setTravelFormDrawer(false));
  };

  const IsDrawerOpen = useSelector((state) => state?.travel?.travelFormDrawer);
  const {origin,
    originOptions,
    loadingOrigin,
    originList,
    departureDate} = useSelector((state) => state?.travel); //  track origin
    const {
        destination,
        destinationOptions,
        destinationList,
        loadingDestination,
      } = useSelector((state) => state.travel);

      useEffect (()=> {

      }, [])

  return (
    <Drawer
      anchor="right"
      open={IsDrawerOpen}
      className={`${styles.checkoutDrower}`}
      transitionDuration={300}
    >
      <Box className={styles.checkoutDrower + " white-bg"} width={463}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box
            component={"header"}
            className={styles.checkoutDrowerHeder}
            py={3}
            px={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={"12px"}
          >
            <Box
              component={"section"}
              gap={1}
              alignItems="center"
              display="flex"
              className={"bold basecolor1 btn-link cursor-pointer"}
              onClick={HandlecloseDrawer}
            >
              <i className={`fa fa-arrow-left fas`}></i>
            </Box>

            <Stack
              flexDirection={"column"}
              component={"span"}
              onClick={(e) => e.stopPropagation()}
            >
              {/*  Show DestinationField only after origin selected */}
              {!originOptions ? (
                <>
                  {/*  Show OriginField always */}
                  <OriginField errors={errors} />
                </>
              ) : !destinationOptions ? (
                <>{originOptions && <DestinationField errors={errors} />}</>
              ) : !departureDate ? (
                <>
                  <DOBField errors={errors} />
                </>
              ) : originOptions && destinationOptions && departureDate ? (
                <>
                  <Travellers errors={errors} />
                </>
              ) : (
                ""
              )}
              <Travellers errors={errors} />

            </Stack>
            <Box>
              <Divider className={`${styles.Divider} Divider`} />
            </Box>
          </Box>

          <Box className={styles.checkoutDrowerBody}>
            <Grid
              container
              px={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            ></Grid>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TravelFormMobileDrawer;
