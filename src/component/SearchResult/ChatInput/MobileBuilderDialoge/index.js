"use client";

import React, { useState } from "react";
import {
  Box,
  DialogContent,
  Drawer,
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
import SidebarTabs from "../../YourTripSedebarCard/SidebarTabs";

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
      anchor="right"
      open={isBuilderDialoge}
      onClose={BuilderDialogeClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "480px",
          boxShadow: "none",
          borderLeft: "1px solid #E6EEEE",
        },
      }}
      SlideProps={{
        timeout: 300, // optional: controls animation duration
      }}
    >
      <DialogContent sx={{ px: 0, py: "18px" }} className="asasas">
        <Box>
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
        <MobileBuilder />
      </Box>
    </Drawer>
  );
};

export default MobileBuilderDialoge;
