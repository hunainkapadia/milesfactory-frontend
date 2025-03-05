import React from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openPassengerDrawer } from "@/src/store/slices/passengerDrawerSlice";
import Link from "next/link";

const CollectPassengerInfo = ({ aiResponse }) => {
  const dispatch = useDispatch();
  const handlePassenger = () => {
    dispatch(openPassengerDrawer());
  };

  const passengerDetails = useSelector(
    (state) => state.passengerDrawer.passengerDetails
  );

  return (
    <>
      <Card
            variant="outlined"
            className={searchResultStyles.flightOfferCard}
            sx={{ mt: 2, p: 2 }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Passengers
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}
                >
                  <Typography className="mb-10" mb={1} variant="h6">
                    Main passenger
                  </Typography>
                  <Typography className="gray">
                    {passengerDetails?.firstName && passengerDetails?.lastName
                      ? `${passengerDetails?.firstName} ${passengerDetails?.lastName}`
                      : ""}
                  </Typography>
                  <Typography className="gray">Adult</Typography>
                </Card>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Card
                  sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}
                >
                  <Typography className="mb-10" variant="h6">
                    Passenger 2
                  </Typography>
                  <Typography className="gray">Adult</Typography>
                </Card>
              </Grid> */}
            </Grid>
            {passengerDetails?.firstName && passengerDetails?.lastName ? (
              ""
            ) : (
              <Box display={"flex"} justifyContent={"flex-end"} pt={2}>
                <Button
                  className="btn btn-green btn-sm"
                  onClick={handlePassenger}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <i className="fa fa-arrow-right"></i>
                    <span>Fill in passenger information</span>
                  </Box>
                </Button>
              </Box>
            )}

            {passengerDetails?.firstName && passengerDetails?.lastName ? (
              <Box display={"flex"} justifyContent={"flex-end"} pt={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  className="dark-green"
                >
                  <i className="fa fa-check"></i>
                  <span>Passenger information</span>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Card>
          {passengerDetails?.firstName && passengerDetails?.lastName ? (
            <>
              <Card
                variant="outlined"
                className={searchResultStyles.flightOfferCard}
                sx={{ mt: 2, p: 2 }}
              >
                <Typography>
                  Thank you for adding the passenger details. You can now continue selecting extra services below:
                </Typography>
              </Card>
              <Card
                variant="outlined"
                className={searchResultStyles.flightOfferCard}
                sx={{ mt: 2, p: 2 }}
              >
                <Typography className="mb-10" mb={1} variant="h6">
                  Extra services
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Card
                      sx={{
                        border: "1px solid #ccc",
                        padding: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography className="mb-10" mb={1} variant="h6">
                          Main passenger
                        </Typography>
                        <Typography className="mb-10" mb={1} variant="h6">
                          + €141
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="gray">
                          {passengerDetails?.firstName &&
                          passengerDetails?.lastName
                            ? `${passengerDetails?.firstName} ${passengerDetails?.lastName}`
                            : ""}
                        </Typography>
                        <Typography className="gray">Adult</Typography>
                      </Box>
                      <Box gap={4} pt={3}>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          gap={4}
                          py={3}
                        >
                          <Box>
                            <Typography className="gray">
                              <span className=" bold ">Seat:</span> 40E
                            </Typography>
                          </Box>
                          <Link className="btn btn-link" href={""}>
                            <Box
                              display="flex"
                              alignItems="center"
                              className="basecolor1"
                              gap={2}
                            >
                              <i className="fa fa-pencil"></i>
                              <div>Change seat</div>
                            </Box>
                          </Link>
                        </Box>
                        {/*  */}
                        <Typography variant="h6">
                          Included in ticket (BCN - CDG)
                        </Typography>
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Box>
                              <img src={"/images/checkout/checked-bagg.svg"} />
                            </Box>
                            <Typography>10 x</Typography>
                          </Box>
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Box>
                              <img src={"/images/checkout/carryon-bagg.svg"} />
                            </Box>
                            <Typography>10 x</Typography>
                          </Box>
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Box>
                              <img
                                src={"/images/checkout/personal-items.svg"}
                              />
                            </Box>
                            <Typography>10 x</Typography>
                          </Box>
                        </Box>
                        {/* baggage end */}
                        <Link className="btn btn-link" href={""}>
                          <Box
                            display="flex"
                            alignItems="center"
                            className="basecolor1"
                            gap={2}
                          >
                            <i className="fa fa-pencil"></i>
                            <div>Change luggage</div>
                          </Box>
                        </Link>
                      </Box>
                      {/*  */}
                    </Card>
                  </Grid>
                </Grid>
                {/* end  */}
                <Box display={"flex"} justifyContent={"flex-end"} p={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    className="dark-green"
                  >
                    <i className="fa fa-check"></i>
                    <span>Extra services</span>
                  </Box>
                </Box>
              </Card>
            </>
          ) : (
            ""
          )}
    </>
  );
};

export default CollectPassengerInfo;
