import React from "react";
import { Box, Typography, Divider, Grid, Drawer } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";
import { useDispatch, useSelector } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import { currencySymbols } from "@/src/utils/utils";
import Link from "next/link";
const BookingDrawer = ({ getFlightDetail }) => {
  console.log("getFlightDetail", getFlightDetail);
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setSelectFlightKey()); //setSelectFlightKey empty then close drawer
  };
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage.SearchHistory
  );
  const searchHistory = SearchHistoryGet || SearchHistorySend;
  const getFlightKey = useSelector((state) => state.booking.setSelectFlightKey);
  return (
    <Drawer
      anchor="right"
      open={getFlightKey}
      onClose={HandlecloseDrawer}
      className={`${styles.checkoutDrower} aaaaa`}
      transitionDuration={300}
    >
      <Box className={styles.checkoutDrower + " white-bg"} width={480}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box
            component={"header"}
            className={styles.checkoutDrowerHeder}
            py={3}
            px={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={3}
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
              <Box component={"span"}>Back to Mylz Chat</Box>
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
              <Divider />
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
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <h4 className={styles.title + " mb-0"}>
                      {getFlightDetail?.slices[0]?.origin.city_name} to{" "}
                      {getFlightDetail?.slices[0]?.destination.city_name}
                    </h4>
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
                    {console.log("22222", getFlightDetail?.slices)}
                    {getFlightDetail?.slices?.length <= 1 ? (
                      <Typography className={"f14 gray"}>
                        {"One way"}
                      </Typography>
                    ) : (
                      <Typography className={"f14 gray"}>{"Return"}</Typography>
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
                      logo={getFlightDetail?.owner?.logo_symbol_url}
                      flightType={index === 0 ? "Outbound" : "Return"}
                      SearchHistoryGet={searchHistory}
                    />
                  </>
                ))}
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <img width={14} src="/images/leave-icon.svg" />
                  <Typography className={styles.normalOption + " f12 gray"}>
                    <span>
                      Emissions estimate: {getFlightDetail?.total_emissions_kg}{" "}
                      kg CO₂e
                    </span>
                  </Typography>
                </Box>
              </>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Footer Section */}
      <BookingDrawerFooter getFlightDetails={getFlightDetail} />
    </Drawer>
  );
};

export default BookingDrawer;
