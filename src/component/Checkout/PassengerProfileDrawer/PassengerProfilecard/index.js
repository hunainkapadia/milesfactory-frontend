import React, { useState } from "react";
import { Box, FormControlLabel, Grid, Radio, Typography } from "@mui/material";

import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import dayjs from "dayjs";
// Example Props (you should pass these from parent)

const PassengerProfilecard = ({ getdata, onClickCard, passFilled }) => {
  const [isOpen, setisOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // Or initial value

  const totalPass = 1; // e.g., traveller number
  const isFilled = true; // or false

  const handleToggle = () => {
    // e.stopPropagation(); // Prevent card click
    setisOpen((prev) => !prev);
  };

  const birthDate = dayjs(getdata.born_on);
  const now = dayjs();

  const years = now.diff(birthDate, "year");
  const months = now.diff(birthDate.add(years, "year"), "month");

  console.log(`${years} years ${months} months`);
  console.log("getdata_profile", `${years} years ${months} months`);

  return (
    <>
      <Box px={3} pb={2}>
        <Box
          className={`${styles.passengersCard} ${styles.passengerProfileCard} ${
            passFilled ? styles.isFilled : ""
          } }`}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          py={2}
        >
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Box
              id={getdata.uuid}
              onClick={onClickCard}
              display={"flex"}
              sx={{ gap: { lg: 2, md: 2, xs: 1.5 } }}
            >
              <FormControlLabel
                value={getdata.name}
                control={
                  <Radio
                    checked={passFilled}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="customRadio"
                    sx={{ p: 0, m: 0 }} // Zero padding & margin using MUI's sx prop
                  />
                }
                sx={{ m: 0, p: 0 }} // Zero padding & margin for FormControlLabel itself
              />

              <Box className="imggroup">
                <img src="/images/user-circle.svg" alt="User" />
              </Box>
              <Box p={0} m={0}>
                {!isFilled ? (
                  <>
                    <Typography
                      sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                      className="bold mb-0"
                      mb={1}
                    >
                      Traveller {totalPass}
                    </Typography>
                    <Typography
                      sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                      textTransform={"uppercase"}
                      className="basecolor f12 capitalize-first-letter"
                    >
                      {getdata.type === "infant_without_seat"
                        ? "Infants"
                        : getdata.type === "child"
                        ? "Child"
                        : getdata.type === "adult"
                        ? "Adult - 18 years and older"
                        : getdata.type}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                      className="bold mb-0"
                      textTransform={"capitalize"}
                      mb={1}
                    >
                      {getdata?.given_name} {getdata?.family_name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                      className="basecolor f12 "
                    >
                      {getdata.type === "infant_without_seat" ? (
                        <>
                          Infants{" "}
                          <Typography
                            component="span"
                            display="inline"
                            className="f12 red"
                          >
                            {years} year{years !== 1 ? "s" : ""}{" "}
                            {months > 0
                              ? `${months} month${months !== 1 ? "s" : ""}`
                              : ""}
                          </Typography>
                        </>
                      ) : getdata.type === "child" ? (
                        <>
                          Child{" "}
                          <Typography
                            component="span"
                            display="inline"
                            className="f12 red"
                          >
                            {years} year{years !== 1 ? "s" : ""}{" "}
                            {months > 0
                              ? `${months} month${months !== 1 ? "s" : ""}`
                              : ""}
                          </Typography>
                        </>
                      ) : getdata.type === "adult" ? (
                        <>
                          Adult{" "}
                          <Typography
                            component="span"
                            display="inline"
                            className="f12 red"
                          >
                            18 years and older
                          </Typography>
                        </>
                      ) : (
                        getdata.type
                      )}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Box
              className="cursor-pointer"
              onClick={() => handleToggle()}
              alignItems="center"
              display={"flex"}
            >
              <Typography
                sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                className="f12 bold mb-0 basecolor1 cursor-pointer"
                display="flex"
                alignItems="center"
                gap={1}
              >
                {isOpen ? "Hide details" : "Show details"}
                <i
                  className={`fas ${
                    isOpen ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                />
              </Typography>
            </Box>
          </Box>
          {isOpen && (
            <Box pt={4} sx={{ pl: { lg: 6, md: 6, xs: 3 } }} width="100%">
              <Grid container rowSpacing={2}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    First name
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {getdata.given_name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Last name
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {getdata.family_name}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Date of birth
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {new Date(getdata.born_on).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Nationality
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {getdata?.nationality?.name}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Passport number
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {getdata.passport_number}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Passport expiry date
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {new Date(getdata.passport_expire_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Email
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {getdata.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="mb-0 bold darkgray"
                  >
                    Phone number
                  </Typography>
                  <Typography
                    sx={{ fontSize: { lg: 14, md: 14, xs: 12 } }}
                    className="darkgray"
                  >
                    {getdata.phone_number}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PassengerProfilecard;
