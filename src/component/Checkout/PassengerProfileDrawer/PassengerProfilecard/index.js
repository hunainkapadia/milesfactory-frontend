import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";

import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// Example Props (you should pass these from parent)

const PassengerProfilecard = ({
  getdata,
  onClickModifyCard,
  passFilled,
  passDisabled,
  onDelete,
  selectCardHandle,
}) => {
  const [isOpen, setisOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // Or initial value
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  console.log("radio_test", passFilled);

  return (
    <>
      <Box pb={2}>
        <Box
          className={`${styles.passengersCard} ${styles.passengerProfileCard} ${
            passFilled ? styles.isFilled : ""
          } ${passDisabled ? styles.passDisabled : ""}`}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          py={2}
        >
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Box
              onClick={() => selectCardHandle()}
              id={getdata.uuid}
              display={"flex"}
              sx={{ gap: { lg: 2, md: 2, xs: 1.5 } }}
            >
              <FormControlLabel
                value="test"
                control={
                  <Radio
                    checked={passFilled} // static true
                    // onChange={(e) => setIsChecked(e.target.checked)}
                    sx={{ p: 0, m: 0 }}
                  />
                }
                sx={{ m: 0, p: 0 }}
              />

              <Box className="imggroup" display={"flex"} alignItems={"center"}>
                <img src="/images/user-circle.svg" alt="User" />
              </Box>
              <Box p={0} m={0} className={Profilestyles.detailCol}>
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
                      sx={{ fontSize: { lg: 13, md: 13, xs: 12 } }}
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
                            {years}
                          </Typography>{" "}
                          year{years !== 1 ? "s" : ""}{" "}
                        </>
                      ) : getdata.type === "child" ? (
                        <>
                          Child{" "}
                          <Typography
                            component="span"
                            display="inline"
                            className="f12 red"
                          >
                            {years}
                          </Typography>{" "}
                          year{years !== 1 ? "s" : ""}{" "}
                        </>
                      ) : getdata.type === "adult" ? (
                        <>
                          Adult{" "}
                          <Typography
                            component="span"
                            display="inline"
                            className="f12 "
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
            <Box alignItems="center" display={"flex"} gap={1}>
              <Typography
                onClick={() => handleToggle()}
                sx={{ fontSize: { lg: 14, md: 14, xs: 10 } }}
                className="bold mb-0 basecolor1 cursor-pointer"
                display="flex"
                alignItems="center"
                gap={1}
                whiteSpace={"nowrap"}
              >
                {isOpen ? "Hide details" : "Show details"}
              </Typography>
              <Box>
                <Box p={1} onClick={handleOpenMenu} className="cursor-pointer">
                  <FontAwesomeIcon color="#69707B" icon={faEllipsisV} />
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      background: "#FFFFFF",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      borderRadius: 8,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      onClickModifyCard();
                      handleCloseMenu();
                    }}
                  >
                    Edit traveller
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      onDelete();
                    }}
                  >
                    Delete Traveller
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
          {isOpen && (
            <Box py={3} width="100%">
              <Grid
                container
                sx={{
                  rowGap: { xs: "16px", md: "45px" }, // mobile → 16px, desktop → 45px
                }}
              >
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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

                <Grid item xs={4}>
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
                <Grid item xs={4}>
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

                <Grid item xs={4}>
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
                <Grid item xs={4}>
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

                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
