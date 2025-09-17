import React from "react";
import { Box, Typography, Divider, Grid, Drawer } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";
import FlightChangeConditions from './FlightChangeConditions';
import FlightRefundConditions from './FlightRefundConditions';
import { useDispatch, useSelector } from "react-redux";
import { setBookingDrawer, setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import { currencySymbols,event } from "@/src/utils/utils";
import Link from "next/link";
const BookingDrawer = ({ }) => {
  
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setBookingDrawer(false)); //setSelectFlightKey empty then close drawer
  };
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage.SearchHistory
  );
  const searchHistory = SearchHistoryGet || SearchHistorySend;
  
  const seeDetail = useSelector(
    (state) => state.passengerDrawer.SeeDetailButton
  );
  
  const getFlightDetail = useSelector((state) => state.booking?.singleFlightData);
  console.log("getFlightDetail", getFlightDetail);
  
  const IsOpendrawer = useSelector((state) => state.booking.bookingDrawer);
  return (
    <Drawer
      anchor="right"
      open={IsOpendrawer}
      onClose={HandlecloseDrawer}
      className={`${styles.checkoutDrower} aaaaa 2222`}
      transitionDuration={300}
      ModalProps={{
        sx: {
          zIndex: (theme) => theme.zIndex.modal + 10, // Ensure this applies to Modal layer
        },
      }}
      PaperProps={{
        sx: {
          zIndex: (theme) => theme.zIndex.modal + 11, // Paper (the drawer container itself)
        },
      }}
    >
      <Box className={styles.checkoutDrower + " white-bg"} width={463}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box
            component={"header"}
            className={styles.checkoutDrowerHeder}
            py={3}
            px={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={"12px"}
          >
            <Box
              component={"section"}
              gap={1}
              alignItems="center"
              display="flex"
              className={" bold basecolor1 btn-link cursor-pointer"}
              onClick={HandlecloseDrawer}
            >
              <i className={`fa fa-arrow-left fas`}></i>{" "}
              <Box component={"span"}>
                Back to Mylz {seeDetail}
              </Box>
            </Box>
            <Box
              component={"section"}
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <h3 className="regular mb-0">Flight details</h3>
            </Box>
            <Box>
              <Divider className={`${styles.Divider} Divider`} />
            </Box>
          </Box>
          <Box className={styles.checkoutDrowerBody}>
            {/* Header Section */}
            <Grid
              container
              px={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid xs={12}>
                <Box
                  mb={3}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <h5 className={styles.title + " mb-0 black"}>
                      {getFlightDetail?.slices[0]?.origin.city_name} to{" "}
                      {getFlightDetail?.slices[0]?.destination.city_name}
                    </h5>
                    <Typography className=" f14 bold">
                      {getFlightDetail?.slices
                        .slice(0, 2)
                        .map((slice) =>
                          new Date(slice.departing_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                            }
                          )
                        )
                        .join(" - ")}
                    </Typography>

                    {getFlightDetail?.slices?.length <= 1 ? (
                      <Typography className={"f14 gray"}>
                        {"One way"},{" "}
                        {
                          getFlightDetail?.slices[0]?.segments[0]?.passengers[0]
                            .cabin_class_marketing_name
                        }
                      </Typography>
                    ) : (
                      <Typography className={"f14 gray"}>
                        {"Return"},{" "}
                        {
                          getFlightDetail?.slices[0]?.segments[0]?.passengers[0]
                            .cabin_class_marketing_name
                        }
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box className={styles.detailsSection} px={3}>
              <>
                {getFlightDetail?.slices.map((slice, index) => (
                  <>
                    <FromAndToDetail
                      key={index} // Always add a unique key when mapping
                      sliceLength={getFlightDetail?.slices.length}
                      getdata={slice}
                      logo={
                        getFlightDetail?.slices[0]?.segments[0]
                          ?.marketing_carrier?.logo_symbol_url
                      }
                      flightType={index === 0 ? "Outbound" : "Return"}
                      SearchHistoryGet={searchHistory}
                    />
                  </>
                ))}
                <Box
                  className={styles.includeWraper + " black"} 
                  display={"flex"}
                  alignItems={"center"}
                  mb={3}
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <img width={14} src="/images/leave-icon-drawer.svg" />
                  </Box>
                  <Typography className={styles.normalOption + " f12 basecolor"}>
                    <span>
                      Emissions estimate: {getFlightDetail?.total_emissions_kg}{" "}
                      kg CO₂e
                    </span>
                  </Typography>
                </Box>
                {/*  */}
                <Box component={"section"}>
                  <FlightChangeConditions 
                    changeCondition={getFlightDetail?.conditions?.change_before_departure}
                    currencySymbols={currencySymbols}
                  />

                  <FlightRefundConditions 
                    refundCondition={getFlightDetail?.conditions?.refund_before_departure}
                    currencySymbols={currencySymbols}
                  />


                </Box>
              </>
            </Box>
          </Box>
        </Box>
        {/* Footer Section */}
        <BookingDrawerFooter getFlightDetails={getFlightDetail} />
      </Box>
    </Drawer>
  );
};

export default BookingDrawer;
