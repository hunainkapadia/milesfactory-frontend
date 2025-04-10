import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

const RightTopSection = ({ offerData, SelectDrawer }) => {
  return (
    <Box display={"flex"} gap={3} flexDirection={"column"}>
      <Box mt={2} style={{ cursor: "pointer" }}>
        <Box onClick={SelectDrawer} className="text-decoration-none basecolor1">
          <Box
            gap={1.5}
            alignItems={"center"}
            display={"flex"}
            className=" semibold"
          >
            <span>Flight details</span>
            <i className="fa-angle-right fa fas"></i>{" "}
          </Box>
        </Box>
      </Box>
      {/*  */}
      {offerData?.slices.length > 1 ? ( // Only show for round trips
      <Box display={"flex"} flexDirection={"column"} gap={1}>
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
            <Box>
              {uniqueBaggages.map((baggage, index) => (
                <Box
                  key={index}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  mb={1}
                >
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
                  <Typography className={" basecolor f11"}>
                    {baggage.quantity}x {baggage.formatted_type}
                  </Typography>
                </Box>
              ))}
            </Box>
          );
        })()}
        <Box display={"flex"} alignItems={"center"}>
          <img width={11} src="/images/leave-icon.svg" />
          <Typography className={searchResultStyles.normalOption}>
            <span> {offerData?.total_emissions_kg} kg CO₂e</span>
          </Typography>
        </Box>
      </Box>

      ): ""}
    </Box>
  );
};

export default RightTopSection;
