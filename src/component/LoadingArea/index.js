import React from "react";
import { Box, Card, CardContent } from "@mui/material";

const LoadingArea = () => {
  return (
    <Box display="flex" justifyContent="flex-start" mb={2}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mb={2}
      >
        <Card
          sx={{
            maxWidth: "50%",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "10px 12px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
            }}
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
          </CardContent>
        </Card>

        <style>
          {`
          .dot {
            width: 8px;
            height: 8px;
            background-color: #1976d2;
            border-radius: 50%;
            animation: bounce 1.5s infinite ease-in-out;
          }
          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
        </style>
      </Box>
    </Box>
  );
};

export default LoadingArea;
