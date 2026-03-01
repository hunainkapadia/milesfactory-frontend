"use client";

import {
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const HotelFacilityCheckinCheckout = ({ hotel }) => {
  // Filter facilities by facilityGroupCode 70
  const facilitiesGroup70 = hotel?.content?.facilities?.filter(
    (facility) => facility?.facilityGroupCode === 70
  ) || [];

  // Find check-in (facilityCode 260) and check-out (facilityCode 390)
  const checkInFacility = facilitiesGroup70.find(
    (facility) => facility?.facilityCode === 260 || facility?.facilityCode === "260"
  );
  const checkOutFacility = facilitiesGroup70.find(
    (facility) => facility?.facilityCode === 390 || facility?.facilityCode === "390"
  );

  // Only render if at least one facility is available
  if (!checkInFacility && !checkOutFacility) {
    return null;
  }

  return (
    <>
      <Box mb={2}>
        <Divider className={`${styles.Divider} Divider`} />
      </Box>
      <Stack className={styles.fromAndToBodyBottom + " "} gap={1}>
        <Box>
          <Typography className="exbold f12 mb-0 h4">
            Check-in & Check-out
          </Typography>
        </Box>
        <Stack
          gap={"5px 18px"}
          flexWrap={"wrap"}
          flexDirection={"row"}
        >
          {/* Check-in Facility */}
          {checkInFacility && checkInFacility?.timeTo && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              className={styles.normalOption}
            >
              <Box
                className={styles.BaggageIcon + "  "}
                display={"flex"}
                alignItems={"center"}
              >
                <img
                  width={14}
                  src={"/images/hotel/clock-icon-gray.svg"}
                  alt="check-in"
                />
              </Box>
              <Typography className="f12 basecolor ">
                Check-in: {checkInFacility?.timeTo}
              </Typography>
            </Box>
          )}

          {/* Check-out Facility */}
          {checkOutFacility && checkOutFacility?.timeTo && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              className={styles.normalOption}
            >
              <Box
                className={styles.BaggageIcon + "  "}
                display={"flex"}
                alignItems={"center"}
              >
                <img
                  width={14}
                  src={"/images/hotel/clock-icon-gray.svg"}
                  alt="check-out"
                />
              </Box>
              <Typography className="f12 basecolor ">
                Check-out: {checkOutFacility?.timeTo}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default HotelFacilityCheckinCheckout;
