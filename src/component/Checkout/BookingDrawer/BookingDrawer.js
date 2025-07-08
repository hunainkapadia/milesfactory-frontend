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
                <Box mb={3}
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
                <Box display={"flex"} gap={2} alignItems={"center"} mb={3}>
                  <Box display={"flex"} alignItems={"center"}>
                    <img width={14} src="/images/leave-icon.svg" />
                  </Box>
                  <Typography className={styles.normalOption + " f12 gray"}>
                    <span>
                      Emissions estimate: {getFlightDetail?.total_emissions_kg}{" "}
                      kg CO₂e
                    </span>
                  </Typography>
                </Box>
                {/*  */}
                <Box component={"section"} >
                  {/* Change with penalty */}
                  {getFlightDetail?.conditions?.change_before_departure
                    ?.allowed === true &&
                    getFlightDetail?.conditions?.change_before_departure
                      ?.penalty_amount > 0 && (
                      <Box display="flex" gap={2} alignItems="center" mb={1}>
                        <Box display={"flex"} alignItems={"center"}>
                          <img
                            width={14}
                            src="/images/flexible-change-with-fee.svg"
                            alt="Change with Fee"
                          />
                        </Box>
                        <Typography variant="body2" className="gray f12">
                          Changes allowed -{" "}
                          {
                            currencySymbols[
                              getFlightDetail?.conditions
                                ?.change_before_departure?.penalty_currency
                            ]
                          }
                          {
                            getFlightDetail?.conditions?.change_before_departure
                              ?.penalty_amount
                          } penalty applies
                        </Typography>
                      </Box>
                    )}

                  {/* Change with no penalty */}
                  {getFlightDetail?.conditions?.change_before_departure
                    ?.allowed === true &&
                    getFlightDetail?.conditions?.change_before_departure
                      ?.penalty_amount === 0 && (
                      <Box display="flex" gap={2} alignItems="center" mb={1}>
                        <Box display={"flex"} alignItems={"center"}>
                          <img
                            width={14}
                            src="/images/flexible-change-icon.svg"
                            alt="Free Change"
                          />
                        </Box>
                        <Typography variant="body2" className="gray f12">
                          Changes allowed - no fee
                        </Typography>
                      </Box>
                    )}

                  {/* Refund with penalty */}
                  {getFlightDetail?.conditions?.refund_before_departure
                    ?.allowed === true &&
                    getFlightDetail?.conditions?.refund_before_departure
                      ?.penalty_amount > 0 && (
                      <Box display="flex" gap={2} alignItems="center" mb={1}>
                        <Box display={"flex"} alignItems={"center"}>
                          <img
                            width={14}
                            src="/images/refund-with-fee.svg"
                            alt="Refund with Fee"
                          />
                        </Box>
                        <Typography variant="body2" className="gray f12">
                          Refundable -{" "}
                          {
                            currencySymbols[
                              getFlightDetail?.conditions
                                ?.refund_before_departure?.penalty_currency
                            ]
                          }
                          {
                            getFlightDetail?.conditions?.refund_before_departure
                              ?.penalty_amount
                          } penalty applies
                        </Typography>
                      </Box>
                    )}

                  {/* Refund with no penalty */}
                  {getFlightDetail?.conditions?.refund_before_departure
                    ?.allowed === true &&
                    getFlightDetail?.conditions?.refund_before_departure
                      ?.penalty_amount === 0 && (
                      <Box display="flex" gap={2} alignItems="center" mb={1}>
                        <Box display={"flex"} alignItems={"center"}>
                          <img
                            width={14}
                            src="/images/refund-icon.svg"
                            alt="Free Refund"
                          />
                        </Box>
                        <Typography variant="body2" className="gray f12">
                          Refundable before departure - no fee
                        </Typography>
                      </Box>
                    )}
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
