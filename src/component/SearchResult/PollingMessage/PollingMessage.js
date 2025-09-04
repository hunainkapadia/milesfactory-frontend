import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "../../LoadingArea";
import { useSelector } from "react-redux";

const PollingMessage = ({ PollingData }) => {  
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistoryGet = useSelector(
      (state) => state.getMessages.SearchHistory
    );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;
  const pollingComplete = useSelector((state)=> state.sendMessage.pollingComplete);
  
  

  return (
    <>
      <Typography component="div">
        Looking for flights. Feel free to further specify airlines, airports, cabin class, departure times, or direct flights. 
        I can also sort the results by cheapest, fastest, or highest-rated options.
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
