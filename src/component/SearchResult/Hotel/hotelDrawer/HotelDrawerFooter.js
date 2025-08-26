import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useSelector } from "react-redux";

const HotelDrawerFooter = () => {
  const hotel = useSelector(
    (state) => state?.booking?.addCart?.raw_data?.hotel
  );
  console.log("hotel_maxRate", hotel);

  // Calculate number of nights
  const checkIn = new Date(hotel?.checkIn);
  const checkOut = new Date(hotel?.checkOut);
  const nights =
    hotel?.checkIn && hotel?.checkOut
      ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 1;

  // Prices
  const totalPrice = Number(hotel?.totalNet) || 0;
  const perNightPrice = nights > 0 ? totalPrice / nights : totalPrice;

  return (
    <>
      <Divider className={`${styles.Divider} Divider`} />
      <Box
        px={3}
        className={styles.checkoutDrowerFooter + " test11"}
        width={"100%"}
      >
        {/* Footer Content */}
        <Box py={2} display="flex" flexDirection="column">
          {/* Hotel Policy Text */}
          <Box
            component={"section"}
            display={"flex"}
            alignItems={"center"}
            pb={2}
            gap={"5px"}
          >
            <Box className="imggroup" display={"flex"}>
              <img
                src="/images/protection-text-icon.svg"
                alt="Protection Icon"
                width="15"
              />
            </Box>
            <Typography
              variant="body2"
              className="gray f12"
              display={{ lg: "block", md: "block", xs: "none" }}
            >
              The hotel’s cancellation policy will apply if you decide to cancel
              or modify your stay.
            </Typography>
            <Typography
              variant="body2"
              className="gray f12"
              display={{ lg: "none", md: "none", xs: "block" }}
            >
              Exclusive direct rate – guaranteed lowest price online
            </Typography>
          </Box>

          {/* Price Row */}
          <Box
            className={styles.priceRow + " aaa"}
            display="flex"
            justifyContent={"space-between"}
            width={"100%"}
          >
            {/* Price Section */}
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
            >
              <Box
                className={styles.priceSection}
                display="flex"
                alignItems="center"
              >
                <h4 className={styles.price + " exbold mb-0 basecolor-dark"}>
                  <span>
                    {currencySymbols[hotel?.currency]}{" "}
                    {Math.round(perNightPrice)} / night
                  </span>
                </h4>
              </Box>
              <Box className={styles.totalPersonPrice}>
                <Typography variant="body2" className=" gray f12">
                  {currencySymbols[hotel?.currency]} {Math.round(totalPrice)}{" "}
                  total ({nights} nights)
                </Typography>
              </Box>
            </Box>

            {/* Actions Section */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={0}
            >
              {/* Close Button */}
              <Box
                display="flex"
                alignItems="center"
                textAlign={"center"}
                className="gray f14"
                style={{ cursor: "pointer" }}
              >
                <span>Close</span>
              </Box>

              {/* Select Stay Button */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="basecolor1"
              >
                <Button
                  sx={{ ml: 3 }}
                  className={
                    styles.selectFlightBtn + " btn btn-primary btn-round btn-sm"
                  }
                >
                  <Box display="flex" gap={1}>
                    <Box>Select stay</Box>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HotelDrawerFooter;
