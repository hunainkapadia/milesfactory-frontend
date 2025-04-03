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
import { closeDrawer, setAddCardDrawer } from "@/src/store/slices/PaymentSlice";
import PaymentCard from "../PaymentCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import PaymentFooter from "./PaymentFooter";

const PaymentAddCardDrawer = ({ getFlightDetail }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [bornOn, setBornOn] = useState(null); // State for date selection

  const handleSelect = (cardId) => {
    setSelectedCard(cardId);
  };
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(closeDrawer()); //setSelectFlightKey empty then close drawer
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
                <Box className=" formGroup">
                  <FormLabel className=" formLabel">Cardholder name</FormLabel>
                  <TextField
                    className="formControl"
                    fullWidth
                    placeholder="Cardholder name"
                    value={""}
                    // onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                  />
                </Box>
                {/*  */}
                <Box className=" formGroup">
                  <FormLabel className=" formLabel">Card number</FormLabel>
                  <TextField
                    className="formControl"
                    fullWidth
                    placeholder="Card number"
                    value={""}
                    // onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                  />
                </Box>
                {/*  */}
                <Box width="100%" className="formGroup">
                  <FormLabel className="bold">Date of Birth</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="formControl"
                      value={bornOn} // ✅ Use valid state (null or dayjs object)
                      onChange={(newValue) => setBornOn(newValue)} // ✅ Updates state correctly
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                {/*  */}
              </Box>
              {/*  */}
            </Box>
          </Box>
          {/* <PaymentFooter HandlecloseDrawer={HandlecloseDrawer} /> */}
        </Box>
      </Box>
    </Drawer>
  );
};

export default PaymentAddCardDrawer;
