import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const UserMessage = (props) => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Box
          className={searchResultStyles.UserMessage}
          sx={{ maxWidth: "75%" }}
        >
          <Typography>{props.userMessage}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default UserMessage;
