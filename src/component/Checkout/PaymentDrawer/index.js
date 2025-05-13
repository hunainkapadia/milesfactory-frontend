import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Drawer,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import paymentStyles from "@/src/styles/sass/components/checkout/Payment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import Link from "next/link";
import {
  closeDrawer,
  setAddCardDrawer,
  setIsDrawer,
  setPaymentDrawer,
} from "@/src/store/slices/PaymentSlice";
import PaymentCard from "../PaymentCard";
import PaymentFooter from "./PaymentFooter";
import StripePayment from "./StripePayment";


const PaymentDrawer = ({ getFlightDetail }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSelect = (cardId) => {
    setSelectedCard(cardId);
  };
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setPaymentDrawer(false)); //setSelectFlightKey empty then close drawer
  };

  const isDrawer = useSelector((state) => state.payment.isDrawer);
  const iscloseDrawer = useSelector((state) => state.payment.isDrawer);
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
    dispatch(closeDrawer()); //setSelectFlightKey empty then close drawer
    dispatch(setAddCardDrawer(true));
  };
  const addCardDrawer = useSelector((state) => state.AddCardDrawer);
  const handleTermsChange = (e) => {
    setAgreeTerms(e.target.checked);
  };
  return (
    <Drawer
      // className={styles.MobileDrawer}
      anchor="right"
      open={isDrawer} // Use correct state
      onClose={HandlecloseDrawer} // Close on backdrop click
      className={`${styles.checkoutDrower} ${styles.MobileDrawer} aaaaa`}
    >
      <Box className={styles.checkoutDrower + " white-bg"} width={480}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box className={styles.checkoutDrowerBody}>
            <Box className={styles.checkoutDrowerHeder} px={3}>
              <Box
                py={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <h3 className={" mb-0 regular"}>Payment</h3>
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
            </Box>
            {/* Header Section */}

            <StripePayment />

          </Box>
          {/* <PaymentFooter selectedCard={selectedCard} agreeTerms={agreeTerms} /> */}
        </Box>
      </Box>
    </Drawer>
  );
};

export default PaymentDrawer;
