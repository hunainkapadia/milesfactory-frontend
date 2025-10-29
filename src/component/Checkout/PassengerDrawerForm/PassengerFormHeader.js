import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import React from "react";
import { Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";

const PassengerDrawerHeader = ({ handleCloseDrawer }) => {
  const CartType = useSelector((state) => state.booking.cartType);
  const selectPassenger = useSelector(
      (state) => state?.passengerDrawer?.SelectPassenger
    );
  return (
    <Box
      px={3}
      component={"header"}
      className={"checkoutDrowerHeder"}
      pt={3}
      display="flex"
      justifyContent="space-between"
      flexDirection={"column"}
      gap={3}
    >
      {/* Back Button */}
      <Box
        component={"section"}
        gap={1}
        alignItems="center"
        display="flex"
        className={" bold basecolor1 btn-link cursor-pointer"}
        onClick={handleCloseDrawer}
      >
        <i className={`fa fa-arrow-left fas`}></i>
        <Box component={"span"}>Back to Mylz Chat</Box>
      </Box>

      {/* Traveller Title */}
      {(CartType === "all" || CartType === "flight") && (
        <Box
          component={"section"}
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box>
            <h3 className="regular mb-0">
              Traveller details -{" "}
              <span className="capitalize">
                {selectPassenger?.type === "infant_without_seat" ? (
                  <>
                    Infant {selectPassenger?.age > 1 ? "s" : ""} {selectPassenger?.age}{" "}
                    {selectPassenger?.age > 1 ? "years" : "year"}
                  </>
                ) : selectPassenger?.type === "child" ? (
                  <>
                    Child {selectPassenger?.age} {selectPassenger?.age > 1 ? "years" : "year"}
                  </>
                ) : (
                  <>{selectPassenger?.type} 18+ years</>
                )}
              </span>
            </h3>
          </Box>
        </Box>
      )}

      <Divider />
    </Box>
  );
};

export default PassengerDrawerHeader;
