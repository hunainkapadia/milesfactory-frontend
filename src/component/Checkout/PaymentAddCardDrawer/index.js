import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Drawer,
  FormControlLabel,
  Checkbox,
  FormLabel,
  TextField,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import paymentStyles from "@/src/styles/sass/components/checkout/Payment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import Link from "next/link";
import { closeDrawer, setAddCardDrawer, setCloseCardDrawer } from "@/src/store/slices/PaymentSlice";
import PaymentCard from "../PaymentCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PaymentAddCardFooter from "./PaymentAddCardFooter";
import dayjs from "dayjs";

const PaymentAddCardDrawer = ({ getFlightDetail }) => {
  const [selectedCard, setSelectedCard] = useState(null);
    const [CardholderName, setCardholderName] = useState("");
    const [valueCardNumber, setvalueCardNumber] = useState("");
    const [CardExpiryDate, setCardExpiryDate] = useState(dayjs()); // or `null`
    const [CardSecurityCode, setCardSecurityCode] = useState("");
    const [CardZipCode, setCardZipCode] = useState("");
  const [bornOn, setBornOn] = useState(null); // State for date selection

  const params = {
    CardholderName,
    valueCardNumber,
    CardExpiryDate: CardExpiryDate ? CardExpiryDate.format("MM/YYYY") : "",
    CardSecurityCode,
    CardZipCode,
  };
  const handleSelect = (cardId) => {
    setSelectedCard(cardId);
  };
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setCloseCardDrawer()); //setSelectFlightKey empty then close drawer
  };

  const isDrawer = useSelector((state) => state.payment.AddCardDrawer);
  console.log("paymentisDrawer", isDrawer);

  const iscloseDrawer = useSelector((state) => state.payment);
  const cardData = [
    {
      id: 1,
      name: "master",
      image: "/images/master-logo.png",
      title: "Mastercard XXXX 1234",
      desc: "L. Abella - 04 / 2028",
    },
    {
      id: 2,
      name: "visa",
      image: "/images/visa-logo.png",
      title: "VISA XXXX 4321",
      desc: "L. Abella - 11 / 2026",
    },
  ];

  const AddCardHandel = () => {
    dispatch(setAddCardDrawer());
    dispatch(closeDrawer()); //setSelectFlightKey empty then close drawer
  };
  return (
    <Drawer
      className={styles.MobileDrawer}
      anchor="left"
      open={isDrawer} // Use correct state
      onClose={HandlecloseDrawer} // Close on backdrop click
    >
      <Box className={styles.checkoutDrower + " white-bg"}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box className={styles.checkoutDrowerBody}>
            {/* Header Section */}
            <Box
              className={styles.checkoutDrowerHeder}
              my={2}
              px={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <h4 className={styles.title + " mb-0 regular"}>
                  Add a new credit card
                </h4>
              </Box>
              <Box
                onClick={HandlecloseDrawer}
                className=" basecolor cursor-pointer"
              >
                <i className="fa fa-close fas"></i>
              </Box>
            </Box>
            <Box>
              <Divider />
            </Box>

            <Box pt={2} pb={4} px={3} gap={2}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Box className="imggroup">
                  <img
                    src={"/images/master-logo.png"}
                    alt={"master"}
                    width={40}
                  />
                </Box>
                <Box className="imggroup">
                  <img src={"/images/visa-logo.png"} alt={"visa"} width={40} />
                </Box>
              </Box>
              {/*  */}
              <Box spacing={2} py={2}>
                {/*  */}
                {/*  */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box className=" formGroup">
                      <FormLabel className=" formLabel">
                        Cardholder name
                      </FormLabel>
                      <TextField
                        className="formControl"
                        fullWidth
                        placeholder="Cardholder name"
                        value={CardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        margin="normal"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box className=" formGroup">
                      <FormLabel className=" formLabel">Card number</FormLabel>
                      <TextField
                        className="formControl"
                        fullWidth
                        placeholder="Card number"
                        value={valueCardNumber}
                        onChange={(e) => setvalueCardNumber(e.target.value)}
                        margin="normal"
                      />
                    </Box>
                  </Grid>
                  {/* First Date Picker */}
                  <Grid item xs={12} md={6}>
                    <Box className="formGroup">
                      <FormLabel className="bold">Expiry date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className="formControl"
                          value={CardExpiryDate}
                          onChange={(newValue) => setCardExpiryDate(newValue)}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth margin="normal" />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className=" formGroup">
                      <FormLabel className=" formLabel">
                        Security code
                      </FormLabel>
                      <TextField
                        className="formControl"
                        fullWidth
                        placeholder="CVV"
                        value={CardSecurityCode}
                        onChange={(e) => setCardSecurityCode(e.target.value)}
                        margin="normal"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box className=" formGroup">
                      <FormLabel className=" formLabel">
                        ZIP / Postcode
                      </FormLabel>
                      <TextField
                        className="formControl"
                        fullWidth
                        placeholder="ZIP / Postcode"
                        value={CardZipCode}
                        onChange={(e) => setCardZipCode(e.target.value)}
                        margin="normal"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControlLabel
                      sx={{ display: "flex", alignItems: "start" }} // Aligns items to the top-left
                      control={
                        <Checkbox
                          // onChange={(e) => setAgreeTerms("e.target.checked")}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="textSecondary">
                          I have read and accepted General Conditions of Sale
                          and Fare conditions. I have read the Legal notices and
                          accepted that the airline policy will apply if I
                          decide to cancel or modify my trip.
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
                {/*  */}
              </Box>
              {/*  */}
            </Box>
          </Box>
          <PaymentAddCardFooter
            HandlecloseDrawer={HandlecloseDrawer}
            params={params}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default PaymentAddCardDrawer;
