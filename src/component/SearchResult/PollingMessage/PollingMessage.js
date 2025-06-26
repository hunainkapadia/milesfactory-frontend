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
        We have everything we need. Searching flights with the following
        details:
        <Box pt={2}>
          <ul className="no-list">
            <li style={{ marginBottom: "0.5rem" }}>
              Passengers: {SearchHistory?.adults}{" "} 
              {SearchHistory?.adults === 1 ? `adult` : `adults`}
              {SearchHistory?.children?.length > 0 &&
                `, ${SearchHistory.children.length} ${
                  SearchHistory.children.length === 1 ? "child" : "children"
                }`}
              {SearchHistory?.infants > 0 &&
                `, ${SearchHistory.infants} ${
                  SearchHistory.infants === 1 ? "infant" : "infants"
                }`}
            </li>

            <li style={{ marginBottom: "0.5rem" }}>
              Cabin: {SearchHistory?.cabin_class}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Trip type: {SearchHistory?.flight_type}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              From: {SearchHistory?.from_destination}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              To: {SearchHistory?.to_destination}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Departure:{" "}
              {new Date(SearchHistory?.departure_date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </li>
            {console.log("SearchHistory_arrival_date", SearchHistory)}
            {SearchHistory?.flight_type !== "one-way" ? (
              <li style={{ marginBottom: "0.5rem" }}>
                Arrival:{" "}
                {new Date(SearchHistory?.arrival_date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </li>
            ) : (
              ""
            )}
          </ul>
        </Box>
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
