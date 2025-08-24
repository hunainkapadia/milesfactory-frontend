"use client";

import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/mobileBuilder.module.scss";
import { setIsBuilderDialog } from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";
import { event } from "@/src/utils/utils";

const MobileBuilder = () => {
  const dispatch = useDispatch();
  const isBuilder = useSelector((state) => state?.base?.IsBuilderDialog);
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const isBuilderArgument = getBuilder?.silent_function_template?.[0];

  const handleTabClick = (tab) => {
    if (!isBuilderArgument) return;

    // GA event
    event({
      action: 'click',
      category: 'engagement',
      label: 'Builder Toggle Mobile Clicked',
    });

    console.log("Builder Toggle Mobile Clicked");
    dispatch(setIsBuilderDialog(tab === "builder"));
  };

  console.log("isBuilder", isBuilder);
  

  return (
    <>
      {isBuilderArgument && (
        <Box
          className={`${styles.switchWrapper} customTabs`}
          sx={{
            backgroundColor: "#F2F7F8",
            borderRadius: "8px",
            padding: "4px",
            display: "flex",
            gap: "4px",
            width: "100%",
          }}
        >
          {/* Chat Tab */}
          <Box
            className={`${styles.label} ${
              !isBuilder ? styles.active : styles.inactive
            }`}
            onClick={() => handleTabClick("chat")}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex={1}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2">Chat</Typography>
          </Box>

          {/* Builder Tab */}
          <Box
            className={`${styles.label} ${
              isBuilder ? styles.active : styles.inactive
            }`}
            onClick={() => handleTabClick("builder")}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex={1}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2">Builder</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MobileBuilder;
