import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

const RightTopSection = ({
  offerData,
  SelectDrawer,
  selected,
  selectedFlightKey,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  const isRoundTrip = offerData?.slices.length > 1;

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: { md: "column", lg: "column", xs: "row-reverse" },
        justifyContent: { xs: "space-between" },
        alignItems: { xs: "center", lg: "flex-start", md: "flex-start" },
        gap: { md: 3, lg: 3, xs: 2 },
        mb: "6px",
      }}
      width={"100%"}
      className={searchResultStyles.RightTopSection + " RightTopSection"}
    >
      
        <Box style={{ cursor: "pointer" }}>
          <Box
            onClick={SelectDrawer}
            className="text-decoration-none basecolor1"
          >
            <Box
              gap={"4px"}
              alignItems={"center"}
              display={"flex"}
              className=" bold f12"
              sx={{
                fontSize: { xs: "12px", md: "16px" },
              }}
            >
              <span>See details</span>
              <i className="fa-angle-right fa fas"></i>{" "}
            </Box>
          </Box>
        </Box>
      
      {/*  */}
      {/* for mobile baggage start */}
      {isMobile ? ( // Only show for round trips
        <Box
          className={searchResultStyles.BaggageCol}
          display={"flex"}
          gap={1}
          sx={{
            flexDirection: { md: "column", lg: "column", xs: "row" },
            gap: { md: 1, lg: 1, xs: 2 },
          }}
        >
          {(() => {
            const baggageMap = new Map();

            offerData?.slices.forEach((slice) => {
              slice?.segments?.forEach((segment) => {
                segment?.passengers?.forEach((passenger) => {
                  passenger?.baggages?.forEach((baggage) => {
                    const key = `${baggage.type}-${baggage.formatted_type}`;
                    if (!baggageMap.has(key)) {
                      baggageMap.set(key, { ...baggage });
                    }
                  });
                });
              });
            });

            const uniqueBaggages = Array.from(baggageMap.values());
            return (
              <Box
                display={"flex"}
                sx={{
                  flexDirection: { md: "column", lg: "column", xs: "row" },
                  gap: { md: 1, lg: 1, xs: 2 },
                }}
              >
                {uniqueBaggages.map((baggage, index) => (
                  <Tooltip
                    key={index}
                    title={`${baggage.formatted_type} x${baggage.quantity}`}
                    placement="top"
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={3000}
                  >
                    <Box
                      display="flex"
                      gap={1}
                      alignItems="center"
                      sx={{ cursor: "default" }}
                    >
                      <Box
                        className={searchResultStyles.BaggageIcon}
                        style={{ opacity: 0.7 }}
                      >
                        <img
                          width={13}
                          height={13}
                          src={
                            baggage?.type === "checked"
                              ? "/images/checkout/checked-bagg.svg"
                              : "/images/checkout/carryon-bagg.svg"
                          }
                          alt={`${baggage?.formatted_type} icon`}
                        />
                      </Box>
                      <Typography className="basecolor f11">
                        {baggage.quantity}x{" "}
                        <Box
                          component="span"
                          sx={{
                            display: { lg: "inline", md: "inline", xs: "none" },
                          }}
                        >
                          {baggage.formatted_type}
                        </Box>
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            );
          })()}
          {/* <Box display={"flex"} alignItems={"center"} gap={1}>
            <img width={11} src="/images/leave-icon.svg" />
            <Typography className="f12 gray">
              <span>
                {" "}
                {offerData?.total_emissions_kg}
                <Box
                  component="span"
                  sx={{
                    display: { lg: "inline", md: "inline", xs: "none" },
                  }}
                >
                  {" "}
                  kg CO₂e
                </Box>
              </span>
            </Typography>
          </Box> */}
        </Box>
      ) : (
        ""
      )}
      {/* for mobile baggage */}
    </Box>
  );
};

export default RightTopSection;
