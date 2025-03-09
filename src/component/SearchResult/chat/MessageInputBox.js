import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const MessageInputBox = () => {
  
  return (
    <section>
      <div
        className={`${searchResultStyles.SearchBoxSection} ${
          messages.length ? searchResultStyles.active : ""
        } SearchBoxSection basecolor1-light-bg`}
      >
        <Container>
          <Box
            className={searchResultStyles.SearchBox + " SearchBox"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              className={searchResultStyles.SearchForm + " SearchForm"}
              fullWidth
              placeholder="Describe your trip, and I’ll do the rest"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <i className="fa fa-arrow-right"></i>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Box>
        </Container>
      </div>
    </section>
  );
};

export default MessageInputBox;
