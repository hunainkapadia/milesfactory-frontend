import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const PollingMessage = ({ PollingData }) => {
  console.log("PollingData", PollingData);

  return (
    <Typography component="div">
      We have everything we need. Searching flights with the following details:
      <Box pt={2}>
        <ul className="no-list">
          <li style={{ marginBottom: "0.5rem" }}>
            Passengers: {PollingData?.adults}{" "}
            {PollingData?.adults === 1 ? "adult" : "adults"}
            {PollingData?.children > 0 &&
              `, ${PollingData.children} child(ren)`}
            {PollingData?.infants > 0 && `, ${PollingData.infants} infant(s)`}
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Cabin: {PollingData?.cabin_class} class
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
            {new Date(PollingData?.departure_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Return:{" "}
            {new Date(PollingData?.arrival_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </li>
        </ul>
      </Box>
    </Typography>
  );
};

export default PollingMessage;
