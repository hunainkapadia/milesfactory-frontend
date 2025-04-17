import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

const RightTopSection = ({ offerData, SelectDrawer }) => {
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
        marginBottom:{xs: 4},
      }}
      width={"100%"}
      className={searchResultStyles.RightTopSection + " RightTopSection"}
    >
      <Box  style={{ cursor: "pointer" }}>
        <Box onClick={SelectDrawer} className="text-decoration-none basecolor1">
          <Box
            gap={1.5}
            alignItems={"center"}
            display={"flex"}
            className=" semibold"
            sx={{
              fontSize: { xs: "12px", md: "16px" },
            }}
          >
            <span>Flight details</span>
            <i className="fa-angle-right fa fas"></i>{" "}
          </Box>
        </Box>
      </Box>
      {/*  */}
      {(isMobile || isRoundTrip) ? ( // Only show for round trips
        <Box
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
                  <Box key={index} display="flex" gap={1} alignItems="center">
                    <Box
                      className={searchResultStyles.BaggageIcon}
                      style={{ opacity: 0.7 }}
                    >
                      <img
                        width={11}
                        src={
                          baggage?.type === "checked"
                            ? "/images/checkout/checked-bagg.svg"
                            : "/images/checkout/carryon-bagg.svg"
                        }
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
                ))}
              </Box>
            );
          })()}
          <Box display={"flex"} alignItems={"center"} gap={1}>
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
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default RightTopSection;
