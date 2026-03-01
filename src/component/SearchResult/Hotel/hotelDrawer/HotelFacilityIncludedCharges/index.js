"use client";

import {
  Box,
  Stack,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const HotelFacilityIncludedCharges = ({ hotel }) => {
  // Facility group codes already shown in other components
  const EXCLUDED_GROUP_CODES = [10, 30, 80];
  
  // Facility codes to exclude (checkin 260, checkout 390)
  const EXCLUDED_FACILITY_CODES = [260, 390, "260", "390", 240, 25];

  // Filter facilities that have indFee and indLogic
  const facilitiesWithCharges = hotel?.content?.facilities?.filter(
    (facility) =>
      facility?.indFee !== undefined &&
      !EXCLUDED_GROUP_CODES.includes(facility?.facilityGroupCode) &&
      !EXCLUDED_FACILITY_CODES.includes(facility?.facilityCode)
  ) || [];

  // Only render if there are facilities with charges
  if (facilitiesWithCharges.length === 0) {
    return null;
  }

  // Separate facilities into included and additional charge
  const includedFacilities = facilitiesWithCharges.filter(
    (f) => f?.indFee === false || f?.indFee === "false"
  );
  const additionalFeeFacilities = facilitiesWithCharges.filter(
    (f) => f?.indFee === true || f?.indFee === "true"
  );

  return (
    <>
      <Box mb={2}>
        <Divider className={`${styles.Divider} Divider`} />
      </Box>
      <Stack className={styles.fromAndToBodyBottom + " "} gap={2}>
        {/* Included Facilities Section */}
        <Stack gap={"5px 10px"} flexWrap={"wrap"} flexDirection={"row"}>
          {includedFacilities.map((facility, index) => (
            <Box
              key={facility?.facility?.code}
              display="flex"
              gap={1}
              alignItems="center"
              className={styles.normalOption}
            >
              {/* <Box
                    className={styles.BaggageIcon + "  "}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <img
                      width={14}
                      src={"/images/hotel/hotel-bed-icon.svg"}
                      alt="included"
                    />
                  </Box> */}
              <Typography className="f12 basecolor">
                {facility?.facility?.description?.content}
                {index !== includedFacilities.length - 1 && ","}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Additional Fee Facilities Section */}
        {additionalFeeFacilities.length > 0 && (
          <Box>
            <Typography className="exbold f12 mb-2 h4">
              Available with Additional Charge
            </Typography>
            <Stack gap={"5px 18px"} flexWrap={"wrap"} flexDirection={"row"}>
              {additionalFeeFacilities.map((facility) => (
                <Box
                  key={facility?.facility?.code}
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
                      src={"/images/hotel/hotel-bed-icon.svg"}
                      alt="additional charge"
                    />
                  </Box>
                  <Box display="flex" gap={0.5} alignItems="center">
                    <Typography className="f12 basecolor ">
                      {facility?.facility?.description?.content}
                    </Typography>
                    <Chip
                      label="Extra"
                      size="small"
                      variant="outlined"
                      sx={{
                        height: "18px",
                        fontSize: "10px",
                        color: "#FF9800",
                        borderColor: "#FF9800",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default HotelFacilityIncludedCharges;
