import React from "react";
import { Box, Card, CardContent } from "@mui/material";

const LoadingArea = () => {
  return (
    <Box className="Loading" display="flex" justifyContent="flex-start">
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingArea;
