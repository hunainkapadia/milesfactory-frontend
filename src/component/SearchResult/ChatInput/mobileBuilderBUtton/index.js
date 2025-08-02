"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/mobileBuilder.module.scss";
import { setIsBuilderDialog } from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";

const MobileBuilder = () => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    if (!isBuilderArgument) return; // 

    dispatch(setIsBuilderDialog(!isBuilder));
  };
  const isBuilder = useSelector((state) => state?.base?.IsBuilderDialog);

  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  // getBuilder?.silent_function_template?.[0]?.function?.arguments
  const isBuilderArgument = getBuilder?.silent_function_template?.[0]
  console.log("getBuilder", isBuilderArgument)

  return (
    <>
      <Box className={styles.switchWrapper} onClick={handleToggle}>
        {/* Switch Slider */}
        <Box className={`${styles.slider} ${isBuilder ? styles.right : ""}`} />

        {/* Chat Label */}
        <Box
          className={
            styles.label + " " + (isBuilder ? styles.active : styles.inactive)
          }
        >
          <Typography variant="body2">Chat</Typography>
        </Box>

        {/* Builder Label */}
        <Box
          className={
            styles.label + " " + (!isBuilder ? styles.active : styles.inactive)
          }
        >
          <Typography variant="body2">Builder</Typography>
        </Box>
      </Box>
      
    </>
  );
};

export default MobileBuilder;
