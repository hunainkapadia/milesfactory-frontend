import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Drawer,
  Tabs,
  Tab,
  Divider,
  Alert,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { setThreadDrawer } from "@/src/store/slices/Base/baseSlice";

const ThreadDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const ThreadDrawerOpen = useSelector((state) => state.base.ThreadDrawer);
  console.log("ThreadDrawerOpen", ThreadDrawerOpen);

  const HandlecloseDrawer = () => {
    dispatch(setThreadDrawer(false));
  };

  const ThreadData = useSelector((state) => state?.base?.ThreadData);
  console.log("ThreadDrawerData", ThreadData);
  

  // respons baggage add data
  
  // Check if baggageOptions is an array before filtering

  return (
    <Drawer
      anchor="right"
      open={ThreadDrawerOpen}
      onClose={HandlecloseDrawer}
      className={`${styles.BaggageDrawer} BaggageDrawer`}
      transitionDuration={300}
    >
      <Box className={styles.BaggageDrawerSection} width={300}>
        <Box className={styles.BaggageDrawerBody}>
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={3}
              >
                <Box>
                  <Typography className={`${styles.title} f12 exbold`}>
                    Today
                  </Typography>
                </Box>
                <Box
                  onClick={HandlecloseDrawer}
                  className="cursor-pointer basecolor"
                >
                  <i className="fa fa-close fas"></i>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            px={3}
          >
          {ThreadData ? (
            <Box
              flexDirection={"column"}
              pt={3}
            >
            {ThreadData?.map((getdata, i)=> {
              console.log("thread_getdata", getdata)
              return (
                <>
                  <Box pb={3}>
                    <Typography className="f12">{getdata?.name}</Typography>
                    {/* <Typography className="f12">
                      {new Date(getdata?.created_date).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Typography> */}
                  </Box>
                </>
              );
            })}
            </Box>
          ):""}
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ThreadDrawer;
