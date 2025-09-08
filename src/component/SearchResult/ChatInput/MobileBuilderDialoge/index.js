"use client";

import React, { useState } from "react";
import { Box, DialogContent, Drawer, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsBuilderDialog } from "@/src/store/slices/Base/baseSlice";
import YourTripSedebarCard from "../../YourTripSedebarCard";

import styles from "@/src/styles/sass/components/input-box/mobileBuilder.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import MobileBuilder from "../mobileBuilderBUtton";
import SidebarTabs from "../../YourTripSedebarCard/SidebarTabs";
import Header from "@/src/component/layout/Header";

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
    (state) => state?.booking?.singleFlightData
  );
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);

  const BuilderDialogeClose = () => {
    dispatch(setIsBuilderDialog(false));
  };

  return (
    <Drawer
      className={styles.BuilderDrawer + " BuilderDrawer"}
      anchor="right"
      open={isBuilderDialoge}
      onClose={BuilderDialogeClose}
      ModalProps={{
        hideBackdrop: true,
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          position: "absolute",
          top: "50px", // shift drawer down 50px
          height: "calc(100% - 50px)", // adjust height so it doesn't overflow
          width: "100%",
          maxWidth: "100%",
          boxShadow: "none",
          borderTop: "1px solid #E6EEEE",
          overflow: "hidden", // keep scroll only in content area
          zIndex:4,
        },
      }}
      SlideProps={{
        timeout: 300,
      }}
    >
      <DialogContent sx={{ px: 0, py: "0" }} className="asasas">
        <Box className="1111" >
          <YourTripSedebarCard getBuilder={getBuilder} />
          
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
        <Box width={"100%"} mb={1}>
          <SidebarTabs />
        </Box>
        <MobileBuilder isMobileBuilder />
      </Box>
    </Drawer>
  );
};

export default MobileBuilderDialoge;
