import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TripDetailSlice } from "@/src/store/slices/Base/baseSlice";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Divider,
  Grid,
} from "@mui/material";
// import styles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import Header from "@/src/component/layout/Header";
import FromAndToDetail from "@/src/component/Checkout/BookingDrawer/FromAndToDetail";
// import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import tripStyles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
const TripDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { uuid } = router.query;

  const tripDetail = useSelector((state) => state?.base?.TripDetailData);
  const loading = useSelector((state) => state?.base?.isLoading);

  useEffect(() => {
    if (uuid) dispatch(TripDetailSlice(uuid));
  }, [uuid]);

  //   if (loading || !tripDetail.order.selected_offer) {
  //     return (
  //       <Container sx={{ mt: 10, textAlign: "center" }}>
  //         <CircularProgress />
  //         <Typography mt={2}>Loading trip details...</Typography>
  //       </Container>
  //     );
  //   }

  // Extract useful data
  const offer = tripDetail?.order?.selected_offer;

  const daysLeft = Math.ceil(
    (new Date(offer?.slices[0]?.segments[0]?.departing_at) - new Date()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Box component="main" className={styles.TripBody + " main-body "}>
        <Header isMessage="isMessage" />
        <Box sx={{ backgroundColor: "#e6f5ee" }} py={6}>
          {/* Hero section */}
          <Box
          component={"header"}
          pb={4}
            sx={{
               
              backgroundImage: "url('/plane-wing.jpg')", // put image in /public
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Hi, {tripDetail?.passengers[0]?.given_name}{" "}
              {tripDetail?.passengers[0]?.family_name}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              In {daysLeft} days,{" "}
              {offer?.slices[0]?.segments[0].destination?.city_name} is yours.
            </Typography>
          </Box>
          {/* Trip Detail Card */}
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight={600} gutterBottom>
                Everything is in order
              </Typography>
              <Typography variant="body2" gutterBottom>
                There's nothing to do except waiting {daysLeft} days before
                takeoff. Booking reference (PNR):{" "}
                <span className="exbold">ABC123</span>
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* Flights */}

              {/*  */}

              <Box className={`${styles.checkoutDrower} aaaaa`}>
                <Box
                  className={styles.checkoutDrower + " white-bg"}
                  width={480}
                >
                  <Box className={`${styles.checkoutDrowerSection} ${styles.MyTripDrowerSection} white-bg`}>
                    <Box
                      component={"header"}
                      px={0}
                      display="flex"
                      justifyContent="space-between"
                      flexDirection={"column"}
                      gap={0}
                    >
                      <Box
                        component={"section"}
                        display="flex"
                        justifyContent="space-between"
                        alignItems={"center"}
                      ></Box>
                      <h3 className="regular mb-0">Flight details</h3>
                    </Box>
                    <Box className={styles.checkoutDrowerBody}>
                      {/* Header Section */}
                      <Grid
                        container
                        px={0}
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
                                {offer?.slices[0]?.origin.city_name} to{" "}
                                {offer?.slices[0]?.destination.city_name}
                              </h4>
                              <Typography className=" f14 bold">
                                {offer?.slices
                                  .slice(0, 2)
                                  .map((slice) =>
                                    new Date(
                                      slice.departing_at
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                    })
                                  )
                                  .join(" - ")}
                              </Typography>
                              
                              {offer?.slices?.length <= 1 ? (
                                <Typography className={"f14 gray"}>
                                  {"One way"},{" "}
                                  {
                                    offer?.slices[0]?.segments[0]?.passengers[0]
                                      .cabin_class_marketing_name
                                  }
                                </Typography>
                              ) : (
                                <Typography className={"f14 gray"}>
                                  {"Return"},{" "}
                                  {
                                    offer?.slices[0]?.segments[0]?.passengers[0]
                                      .cabin_class_marketing_name
                                  }
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box
                        className={
                          styles.detailsSection + " " + tripStyles.Tripdetail
                        }
                        py={0}
                        px={0}
                      >
                        <>
                          {offer?.slices.map((slice, index) => (
                            <>
                              <FromAndToDetail
                                key={index} // Always add a unique key when mapping
                                sliceLength={offer?.slices.length}
                                getdata={slice}
                                logo={
                                  offer?.slices[0]?.segments[0]
                                    ?.marketing_carrier?.logo_symbol_url
                                }
                                flightType={index === 0 ? "Outbound" : "Return"}
                                // SearchHistoryGet={searchHistory}
                              />
                            </>
                          ))}
                          <Box
                            display={"flex"}
                            gap={2}
                            alignItems={"center"}
                            mb={3}
                          >
                            <img width={14} src="/images/leave-icon.svg" />
                            <Typography
                              className={styles.normalOption + " f12 gray"}
                            >
                              <span>
                                Emissions estimate: {offer?.total_emissions_kg}{" "}
                                kg CO₂e
                              </span>
                            </Typography>
                          </Box>
                          <Box display={"flex"} gap={2} alignItems={"center"}>
                            <Typography variant="p" className="gray f12" pb={2}>
                              {offer?.conditions?.change_before_departure
                                ?.allowed === true &&
                                offer?.conditions?.change_before_departure
                                  ?.penalty_amount > 0 &&
                                `You can change your flight before departure for ${
                                  offer?.conditions?.change_before_departure
                                    ?.penalty_currency
                                } ${" "} ${
                                  offer?.conditions?.change_before_departure
                                    ?.penalty_amount
                                }`}

                              {offer?.conditions?.change_before_departure
                                ?.allowed === true &&
                                offer?.conditions?.change_before_departure
                                  ?.penalty_amount == 0 &&
                                `You can change your flight before departure without any extra cost`}
                            </Typography>
                          </Box>
                          <Box display={"flex"} gap={2} alignItems={"center"}>
                            <Typography variant="p" className="gray f12" pb={2}>
                              {offer?.conditions?.refund_before_departure
                                ?.allowed === true &&
                                offer?.conditions?.refund_before_departure
                                  ?.penalty_amount > 0 &&
                                `You can refund your flight before departure for ${
                                  offer?.conditions?.refund_before_departure
                                    ?.penalty_currency
                                } ${" "} ${
                                  offer?.conditions?.refund_before_departure
                                    ?.penalty_amount
                                }`}

                              {offer?.conditions?.refund_before_departure
                                ?.allowed === true &&
                                offer?.conditions?.refund_before_departure
                                  ?.penalty_amount == 0 &&
                                `You can refund your flight before departure without any extra cost`}
                            </Typography>
                          </Box>
                        </>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* Footer Section */}
              </Box>

              <Divider sx={{ my: 2 }} />
              {/* Traveler */}
              <Box mb={2}>
                <Typography variant="subtitle2">Travelers</Typography>
                <Typography>
                  {tripDetail?.passengers[0]?.given_name}{" "}
                  {tripDetail?.passengers[0]?.family_name} -{" "}
                  {tripDetail?.passengers[0]?.born_on}
                </Typography>
              </Box>
              {/* Payment Info */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Payment info</Typography>
                  <Typography variant="body2">
                    Total cost:{" "}
                    <strong>
                      {
                        tripDetail?.amount_calculations
                          ?.total_amount_plus_markup_and_all_services
                      }
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Customer service</Typography>
                  <Typography fontSize="14px">
                    Booking reference: <span className="exbold">ABC123</span>
                  </Typography>
                  <Typography fontSize="12px" color="primary" sx={{ mt: 0.5 }}>
                    <a href="mailto:info@milesfactory.com">
                      Send a message to customer service
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              {/* Cancellation section */}
              <Box mt={3} p={2} bgcolor="#f4f4f4" borderRadius={2}>
                <Typography fontWeight="bold">
                  Cancellation without reason
                </Typography>
                <Typography fontSize="13px" mt={1}>
                  Cancel this flight up until departure (penalty of 50 USD).
                </Typography>
                <Button
                  className="btn btn-primary btn-border btn-sm  btn-rounded"
                  sx={{ mt: 1 }}
                >
                  Cancel my booking
                </Button>
              </Box>
              {/* Bottom buttons */}
              {/* <Box display="flex" justifyContent="space-between" mt={3}>
                <Button size="small" variant="outlined">
                  Cancel
                </Button>
                <Button size="small" variant="outlined">
                  Manage bags
                </Button>
                <Button size="small" variant="contained" color="success">
                  Update
                </Button>
              </Box> */}
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default TripDetailPage;
