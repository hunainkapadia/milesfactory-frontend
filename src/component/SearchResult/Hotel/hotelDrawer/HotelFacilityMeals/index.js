"use client";

import {
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const HotelFacilityMeals = ({ hotel }) => {
  // Filter facilities by facilityGroupCode 80 for meals
  const mealsFacilities = hotel?.content?.facilities?.filter(
    (facility) => facility?.facilityGroupCode === 80
  ) || [];

  // Only render if meals facilities are available
  if (mealsFacilities.length === 0) {
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
            Meals Available
          </Typography>
        </Box>
        <Stack
          gap={"5px 18px"}
          flexWrap={"wrap"}
          flexDirection={"row"}
        >
          {/* Meals List */}

            <Box
              display="flex"
              gap={0}
              alignItems="center"
              className={styles.normalOption}
            >
              <Box
                className={styles.BaggageIcon + "  "}
                display={"flex"}
                alignItems={"center"}
              >
              </Box>
              <Typography className="f12 basecolor ">
                {mealsFacilities.map((meal) => (
                    <Box key={meal?.facility?.code}>{meal?.facility?.description?.content? meal.facility.description.content : null}</Box>
                          ))}
              </Typography>
            </Box>

        </Stack>
      </Stack>
    </>
  );
};

export default HotelFacilityMeals;
