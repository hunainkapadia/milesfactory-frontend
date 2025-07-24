"use client";

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsBuilderDialog } from "@/src/store/slices/Base/baseSlice";
import YourTripSedebarCard from "../../YourTripSedebarCard";

import styles from "@/src/styles/sass/components/input-box/mobileBuilder.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import MobileBuilder from "../mobileBuilderBUtton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MobileBuilderDialoge = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const dispatch = useDispatch();
  const isBuilderDialoge = useSelector((state) => state?.base?.IsBuilderDialog);
  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);

  const BuilderDialogeClose = () => {
    dispatch(setIsBuilderDialog(false));
  };

  return (
    <Dialog
      fullScreen
      className=" BuilderDialoge aaa"
      open={isBuilderDialoge}
      onClose={BuilderDialogeClose}
      TransitionComponent={Transition}
      sx={{top:"61px",       boxShadow: "none" }}
        BackdropProps={{ invisible: true }} 

    >
      <DialogContent  sx={{ px: 0, py: "18px", }} className="asasas">
        <Box>
          <YourTripSedebarCard
            offerData={getselectedFlight}
            getBuilder={getBuilder}
          />
        </Box>
      </DialogContent>
      <Box
        component={"footer"}
        className={styles.builderFooter}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        py={"5px"}
        px={"18px"}
      >
        <Tabs 
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          className={TripStyles.customTabs + " customTabs"}
          sx={{
            backgroundColor: "#F2F7F8",
            borderRadius: "8px",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            mb: "6px",
            width:"100%",
          }}
        >
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="f12">Overview</Typography>
              </Box>
            }
            className={`${TripStyles.inactiveTab} ${
              tabValue === 0 ? TripStyles.activeTab : ""
            }`}
          />
        </Tabs>
        <MobileBuilder />
      </Box>
    </Dialog>
  );
};

export default MobileBuilderDialoge;
