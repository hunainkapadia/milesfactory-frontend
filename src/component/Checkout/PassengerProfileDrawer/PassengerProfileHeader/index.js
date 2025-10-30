import React from "react";
import { Box, Divider, Tabs, Tab } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";
import PassengerProfileTab from "../PassengerProfileTab";
import { useSelector } from "react-redux";

const PassengerProfileHeader = ({
  handleCloseDrawer,
  tabValue,
  handleTabChange,
  GetViewPassengers,
  filledPassengerUUIDs,
  showSuccessSnackbar,
}) => {
   
   const selectPassenger = useSelector(
    (state) => state?.passengerDrawer?.SelectPassenger
  );
  
  
  
  return (
    <Box
      px={3}
      component={"header"}
      className={styles.checkoutDrowerHeder}
      py={3}
      mb={0}
      display="flex"
      justifyContent="space-between"
      flexDirection={"column"}
      gap={3}
    >
      {/* Back Button */}
      <Box
        component={"section"}
        gap={"5px"}
        alignItems="center"
        display="flex"
        className={" bold basecolor1 btn-link cursor-pointer"}
        onClick={handleCloseDrawer}
      >
        <i className={`fa fa-arrow-left fas`}></i>{" "}
        <Box component={"span"}>Back to Mylz Chat</Box>
      </Box>

      {/* Title */}
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
                  Infant {selectPassenger?.age > 1 ? "s" : ""}{" "}
                  {selectPassenger?.age}{" "}
                  {selectPassenger?.age > 1 ? "years" : "year"}
                </>
              ) : selectPassenger?.type === "child" ? (
                <>
                  Child {selectPassenger?.age}{" "}
                  {selectPassenger?.age > 1 ? "years" : "year"}
                </>
              ) : (
                <>{selectPassenger?.type} 18+ years</>
              )}
            </span>{" "}
          </h3>
        </Box>
      </Box>

      <Divider />

      {/* Tabs */}
      <Box className={Profilestyles.scrollTabsWrapper}>
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          scrollButtons={false}
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          className={Profilestyles.customTabs}
        >
          {GetViewPassengers?.map((passenger, index) => {
            const isActive = tabValue === index;
            const isFilled = filledPassengerUUIDs?.includes(passenger.uuid);

            

            return (
              <Tab
                key={passenger.uuid || index}
                disableRipple
                disableFocusRipple
                className={`${Profilestyles.inactiveTab} ${
                  isActive ? Profilestyles.activeTab : ""
                }`}
                label={
                  <PassengerProfileTab
                    passName={`${passenger.type} ${index + 1}`}
                    getdata={passenger}
                    totalPass={index + 1}
                    isActive={isActive}
                    isFilled={isFilled}
                    onClickCard={() => handleTabChange(index, passenger.type)} // triggers tab switch
                    passDetail={passenger}
                  />
                }
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Snackbar */}
      {showSuccessSnackbar && (
        <Box
          position="fixed"
          bottom={20}
          left="50%"
          sx={{ transform: "translateX(-50%)" }}
          zIndex={9999}
          color="white"
          px={3}
          py={1}
          borderRadius={100}
          className=" f14 basecolor1-bg"
        >
          Passenger saved successfully
        </Box>
      )}
    </Box>
  );
};

export default PassengerProfileHeader;
