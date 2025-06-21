import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "../../LoadingArea";
import { useSelector } from "react-redux";

const PollingMessage = ({ PollingData }) => {
  

  const pollingComplete = useSelector((state)=> state.sendMessage.pollingComplete);
  
  

  return (
    <>
      <Typography component="div">
        We have everything we need. Searching flights with the following
        details:
        <Box pt={2}>
          <ul className="no-list">
            <li style={{ marginBottom: "0.5rem" }}>
              Passengers: {PollingData?.adults}{" "}
              {PollingData?.adults === 1 ? "adult" : "adults"}
              {PollingData?.children?.length > 0 &&
                `, ${PollingData.children.length} ${
                  PollingData.children.length === 1 ? "child" : "children"
                }`}
              {PollingData?.infants > 0 &&
                `, ${PollingData.infants} ${
                  PollingData.infants === 1 ? "infant" : "infants"
                }`}
            </li>

            <li style={{ marginBottom: "0.5rem" }}>
              Cabin: {PollingData?.cabin_class}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Trip type: {PollingData?.flight_type}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              From: {PollingData?.from_destination}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              To: {PollingData?.to_destination}
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Departure:{" "}
              {new Date(PollingData?.departure_date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </li>
            {console.log("PollingData_arrival_date", PollingData)}
            {PollingData?.flight_type !== "one-way" ? (
              <li style={{ marginBottom: "0.5rem" }}>
                Arrival:{" "}
                {new Date(PollingData?.arrival_date).toLocaleDateString(
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
