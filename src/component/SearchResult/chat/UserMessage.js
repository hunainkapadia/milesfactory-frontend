import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const UserMessage = (props) => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Card
          className={searchResultStyles.UserMessage}
          sx={{ maxWidth: "75%" }}
        >
          <Typography variant="body2">{props.userMessage}</Typography>
        </Card>
      </Box>
    </>
  );
};

export default UserMessage;
