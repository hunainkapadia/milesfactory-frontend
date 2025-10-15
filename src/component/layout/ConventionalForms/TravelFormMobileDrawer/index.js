import React from "react";
import {
  Box,
  Typography,
  Grid,
  Drawer,
  Stack,
  IconButton,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Travelstyles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OriginField from "../OriginField";
import { setTravelFormDrawer } from "@/src/store/slices/TravelSlice";
import DestinationField from "../DestinationField";
import DOBField from "../DOBField";
import Travellers from "../Travellers";
import TripTypeField from "../TripTypeField";

const TravelFormMobileDrawer = ({ errors, handleSearch, isLoading }) => {
  const dispatch = useDispatch();

  const HandlecloseDrawer = () => {
    dispatch(setTravelFormDrawer(false));
  };

  const IsDrawerOpen = useSelector((state) => state?.travel?.travelFormDrawer);
  const { originOptions, destinationOptions, departureDate } = useSelector(
    (state) => state?.travel
  );

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
            className={`${styles.checkoutDrowerHeder} ${styles.TravelFormDrawer}`}
            py={3}
            px={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={"12px"}
          >
          {console.log("originOptions99", originOptions)}
            <Stack
              flexDirection={"column"}
              component={"span"}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Step 1: Origin */}
              
              {!originOptions ? (
                <Box
                  className={`${Travelstyles.TravelFormHeader}`}
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Box
                    className={"bold basecolor1 cursor-pointer"}
                    onClick={HandlecloseDrawer}
                  >
                    <i className="fa fa-arrow-left fas"></i>
                  </Box>
                  <Box className={styles.DrawerfromAndtoField}>
                    <OriginField errors={errors} isDrawer />
                  </Box>
                </Box>
              ) : originOptions && !destinationOptions ? (
                // Step 2: Destination
                <Box
                  className={`${Travelstyles.TravelFormHeader}`}
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Box
                    className={"bold basecolor1 cursor-pointer"}
                    onClick={HandlecloseDrawer}
                  >
                    <i className="fa fa-arrow-left fas"></i>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} width="100%">
                    <Box className={styles.DrawerfromAndtoField + " w-100"}>
                      <OriginField errors={errors} isDrawer />
                    </Box>
                    <Box className={styles.DrawerfromAndtoField + " w-100"}>
                      <DestinationField errors={errors} isDrawer />
                    </Box>
                  </Box>
                </Box>
              ) : originOptions && destinationOptions && !departureDate ? (
                // Step 3: Date
                <Box
                  className={`${Travelstyles.TravelFormHeader}`}
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Box
                    className={"bold basecolor1 cursor-pointer"}
                    onClick={HandlecloseDrawer}
                  >
                    <i className="fa fa-arrow-left fas"></i>
                  </Box>
                  <Box className={styles.DrawerfromAndtoField + " w-100"}>
                    <DOBField errors={errors} />
                  </Box>
                </Box>
              ) : (
                // Step 4: Travellers + TripType + Button
                <>
                  <Box
                    className={`${Travelstyles.TravelFormHeader}`}
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Box
                      className={"bold basecolor1 cursor-pointer"}
                      onClick={HandlecloseDrawer}
                    >
                      <i className="fa fa-arrow-left fas"></i>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography>Who are the travelers?</Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Stack display={"flex"} alignItems={"center"}>
                      <Travellers errors={errors} />
                      <TripTypeField errors={errors} />
                    </Stack>
                  </Box>

                  {/* ✅ Reused Search Button */}
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={3}
                  >
                    <IconButton
                      className={Travelstyles.SearchButton}
                      onClick={handleSearch}
                      disabled={isLoading}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </IconButton>
                  </Box>
                </>
              )}
            </Stack>
          </Box>

          <Box className={styles.checkoutDrowerBody}>
            <Grid container px={3}></Grid>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TravelFormMobileDrawer;
