import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const PollingMessage = ({ PollingData }) => {
  console.log("PollingData", PollingData);

  return (
    <Typography className="bold">
      We have everything we need, now looking for flights: <br />
      {PollingData?.adults} {PollingData?.adults === 1 ? "adult" : "adults"}
      {PollingData?.children > 0 && `, ${PollingData.children} child(ren)`}
      {PollingData?.infants > 0 && `, ${PollingData.infants} infant(s)`},{" "}
      {PollingData?.cabin_class} class, {PollingData?.flight_type}, from{" "}
      {PollingData?.from_destination} to {PollingData?.to_destination},
      departing on{" "}
      {new Date(PollingData?.departure_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
      , returning on{" "}
      {new Date(PollingData?.arrival_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </Typography>
  );
};

export default PollingMessage;
