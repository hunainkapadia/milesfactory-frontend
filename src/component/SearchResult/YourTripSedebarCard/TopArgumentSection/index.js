import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";

const TopArgumentSection = () => {
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder); // builder
  const BuilderArguments =
    getBuilder?.silent_function_template[0]?.function.arguments || {};
    const forHotel = BuilderArguments?.trip_components?.[0] === "hotel" || ""
    

  return (
    <>
      <Box
        id="overview"
        mb={2}
        className={TripStyles.Header2 + " aaa"}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Box>
          <Box>
            {BuilderArguments?.to_destination &&
            BuilderArguments?.trip_length ? (
              <Typography
                component="h4"
                sx={{ fontSize: { xs: "16px", md: "20px" } }}
                className="bold black mb-0"
              >
                My {BuilderArguments.trip_length} day
                {BuilderArguments.trip_length > 1 ? "s" : ""} travel to{" "}
                {BuilderArguments.to_destination}
              </Typography>
            ) : BuilderArguments?.to_destination &&
              BuilderArguments?.trip_length ? (
              <h4 className="bold black mb-0">
                My {BuilderArguments.trip_length} day
                {BuilderArguments.trip_length > 1 ? "s" : ""} travel to{" "}
                {BuilderArguments.to_destination}
              </h4>
            ) : BuilderArguments?.to_destination &&
              BuilderArguments?.from_destination ? (
              <h4 className="bold black mb-0">
                My travel to {BuilderArguments.to_destination}
              </h4>
            ) : BuilderArguments?.to_destination ? (
              <h4 className="bold black mb-0">
                My travel to {BuilderArguments.to_destination}
              </h4>
            ) : null}
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            className={TripStyles.tripDetails}
          >
            {BuilderArguments?.from_destination &&
              BuilderArguments?.to_destination && (
                <Box
                  sx={{}}
                  className={TripStyles.tripDetailsCol + " f12 black bold"}
                >
                  {BuilderArguments.from_destination} -{" "}
                  {BuilderArguments.to_destination}
                </Box>
              )}

            {(BuilderArguments?.departure_date ||
              BuilderArguments?.return_date) && (
              <Box
                sx={{}}
                className={TripStyles.tripDetailsCol + " f12 black bold"}
              >
                {BuilderArguments?.departure_date && (
                  <>
                    {new Date(
                      BuilderArguments.departure_date
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </>
                )}
                {BuilderArguments?.return_date && (
                  <>
                    {" - "}
                    {new Date(BuilderArguments.return_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </>
                )}
              </Box>
            )}

           {(BuilderArguments?.passengers?.adults ||
                BuilderArguments?.passengers?.children?.length > 0 ||
                (!forHotel && BuilderArguments?.passengers?.infants?.length > 0)) && (
                <Box className={TripStyles.tripDetailsCol + " f12 black bold"}>
                  {(() => {
                    const adults = BuilderArguments?.passengers?.adults || 0;
                    const children =
                      BuilderArguments?.passengers?.children?.length || 0;
                    const infants =
                      BuilderArguments?.passengers?.infants?.length || 0;

                    // If hotel → Combine children + infants
                    const hotelChildrenCount = forHotel
                      ? children + infants
                      : children;

                    return [
                      adults > 0 &&
                        `${adults} ${adults === 1 ? "adult" : "adults"}`,

                      hotelChildrenCount > 0 &&
                        `${hotelChildrenCount} ${
                          hotelChildrenCount === 1 ? "child" : "children"
                        }`,

                      // Only show infants count for flight
                      !forHotel &&
                        infants > 0 &&
                        `${infants} ${infants === 1 ? "infant" : "infants"}`,
                    ]
                      .filter(Boolean)
                      .join(", ");
                  })()}
                </Box>
              )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TopArgumentSection;
