import {
  Box,
  Card,
  Typography,
  Avatar,
  CardContent,
  Grid,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const SearchCard = ({ offerData }) => {
  {console.log("offerData", offerData)}
  return (
    <Card className={searchResultStyles.flightOfferCard}>
      <CardContent className="p-0">
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <Box display="flex" alignItems="center" gap={2}>
              {/* Airline Logo */}
              <Box mr={4}>
                <Avatar
                  src={offerData?.owner?.logo_symbol_url}
                  alt={offerData?.owner?.name}
                  className={searchResultStyles.airlineLogo}
                />
              </Box>

              {/* Flight Details start */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                {/* Departure Time & Code */}
                <Box textAlign="center" flex={1}>
                  <Typography className={searchResultStyles.flightTime}>
                    {new Date(
                      offerData?.slices[0].departing_at
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Typography className={searchResultStyles.flightRoute}>
                    {offerData?.slices[0].origin.iata_code}
                  </Typography>
                </Box>

                {/* Wider Separator */}
                <Box
                  className={searchResultStyles.separater}
                  flex={1}
                  textAlign="center"
                >
                  <span></span>
                </Box>

                {/* Flight Duration */}
                <Box textAlign="center" flex={1}>
                  <Typography className={searchResultStyles.flightDuration}>
                    Direct
                  </Typography>
                  <Typography className={searchResultStyles.flightDuration}>
                    {offerData?.slices[0].duration}
                  </Typography>
                </Box>

                {/* Wider Separator */}
                <Box
                  className={searchResultStyles.separater}
                  flex={1}
                  textAlign="center"
                >
                  <span></span>
                </Box>

                {/* Arrival Time & Code */}
                <Box textAlign="center" flex={1}>
                  <Typography className={searchResultStyles.flightTime}>
                    {new Date(
                      offerData?.slices[0].arriving_at
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Typography className={searchResultStyles.flightRoute}>
                    {offerData?.slices[0].destination.iata_code}
                  </Typography>
                </Box>
              </Box>
              {/* flight detail end */}
              {/*  */}
            </Box>
            {/* with logo */}
          </Grid>
          {/* col8 end */}

          <Grid display={"flex"} justifyContent={"end"} item xs={3}>
            <Box className={searchResultStyles.flightPriceSection}>
              <Box className={searchResultStyles.flightPriceSection}>
                <h3 className={`mb-0 basecolor1 semibold`}>
                  €{offerData?.total_amount}
                </h3>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Extra Info bottom */}
        <Box className={searchResultStyles.rowExtraInfo}>
          <Box display={"flex"} alignItems={"center"}>
            <Typography className={`${searchResultStyles.normalOption}  ${searchResultStyles.fastestOption}`}>
              <img src="/images/clock-icon.svg" /> <span>Fastest option</span>
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography className={searchResultStyles.normalOption}>
              <img src="/images/handcarry-icon.svg" /> <span> pieces</span>
            </Typography>
          </Box>

          <Box display={"flex"} alignItems={"center"}>
            <Typography className={searchResultStyles.normalOption}>
              <img src="/images/handcarry-icon.svg" /> <span> {offerData?.total_emissions_kg} kg CO₂e</span>
            </Typography>
          </Box>
          <Box>
            <button
              className={
                "btn btn-primary btn-md " + searchResultStyles.selectFlightBtn
              }
            >
              <Box display={"flex"} gap={1}>
                <i class="fa fa-arrow-right"></i> <span> Select flight</span>
              </Box>
            </button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
