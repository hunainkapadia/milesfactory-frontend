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
} from "@/src/store/slices/PaymentSlice";
import PaymentCard from "../PaymentCard";
import PaymentFooter from "./PaymentFooter";

const PaymentDrawer = ({ getFlightDetail }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSelect = (cardId) => {
    setSelectedCard(cardId);
  };
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setIsDrawer(false)); //setSelectFlightKey empty then close drawer
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
      className={styles.MobileDrawer}
      anchor="left"
      open={isDrawer} // Use correct state
      onClose={HandlecloseDrawer} // Close on backdrop click
    >
      <Box className={styles.checkoutDrower + " white-bg"}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box className={styles.checkoutDrowerBody}>
          <Box className={styles.checkoutDrowerHeder}  px={3}>
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

            <Box pt={2} pb={15} px={3} className={styles.body}>
              <h6 className="">Select a saved card</h6>
              <Box>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  {cardData.map((getdata) => (
                    <PaymentCard
                      key={getdata.id}
                      getdata={getdata}
                      selected={selectedCard === getdata.name}
                      selectedCard
                      agreeTerms={agreeTerms}
                      onSelect={() => handleSelect(getdata.name)}
                    />
                  ))}

                  <Box
                    onClick={() => AddCardHandel()}
                    className={
                      paymentStyles.AddCard + " basecolor1 cursor-pointer"
                    }
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                    py={3}
                  >
                    {/* Payment Card */}
                    <i className="fa fa-plus"></i>
                    <Typography variant="body1" className={styles.cardTitle}>
                      Add a new card
                    </Typography>
                  </Box>
                  {/* Terms & Conditions */}
                  <Box className={styles.termsContainer}>
                    <FormControlLabel
                      sx={{ display: "flex", alignItems: "start" }} // Aligns items to the top-left
                      control={
                        <Checkbox
                          checked={agreeTerms}
                          onChange={handleTermsChange}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="textSecondary">
                          I have read and accepted <Link className="basecolor" href={"/"}>General Conditions of Sale </Link>
                          and <Link className="basecolor" href={"/"}>Fare conditions</Link>. I have read the <Link className="basecolor" href={"/"}>Legal notices</Link> and
                          accepted that the airline policy will apply if I
                          decide to cancel or modify my trip.
                        </Typography>
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <PaymentFooter selectedCard={selectedCard} agreeTerms={agreeTerms} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default PaymentDrawer;
