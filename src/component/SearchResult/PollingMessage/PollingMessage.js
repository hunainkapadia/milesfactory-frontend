import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "../../LoadingArea";
import { useSelector } from "react-redux";

const PollingMessage = ({ PollingData }) => {
  console.log("PollingData", PollingData);
  
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistoryGet = useSelector(
      (state) => state.getMessages.SearchHistory
    );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  console.log("SearchHistory_poll", SearchHistory);
  
  const pollingComplete = useSelector((state)=> state.sendMessage.pollingComplete);
  
  

  return (
    <>
      <Typography component="div">
        Looking for flights. Please wait...
      </Typography>
      {!pollingComplete ? (
        <Box mt={3}>
          <LoadingArea />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default PollingMessage;
