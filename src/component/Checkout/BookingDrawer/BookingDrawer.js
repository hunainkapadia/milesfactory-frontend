import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";
import { useDispatch } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";

const BookingDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setSelectFlightKey()); //setSelectFlightKey empty then close drawer
  };
  return (
    <Box className={styles.checkoutDrower + " white-bg"}>
      <Box className={styles.checkoutDrowerSection + " white-bg"}>
        <Box className={styles.checkoutDrowerBody}>
          {/* Header Section */}
          <Box
            className={styles.checkoutDrowerHeder}
            py={2}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography variant="h3" className={styles.title + " mb-0 h5"}>
                {getFlightDetail?.slices?.length > 1
                  ? "Roundtrip "
                  : "One way "}
                {"  "}
              </Typography>
              {getFlightDetail?.slices?.map((getSliceres, key) => (
                <React.Fragment key={key}>
                  <Typography
                    variant="h3"
                    className={styles.title + " mb-0 h5"}
                  >
                    {`${getSliceres?.origin?.iata_code} - ${getSliceres?.destination?.iata_code}`}
                  </Typography>
                </React.Fragment>
              ))}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              className="normalOption fastestOption"
            >
              <img src="/images/euro-icon.svg" alt="Euro Icon" />
              <Typography>
                <span>{getFlightDetail?.flight_type}</span>
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box className={styles.detailsSection} px={3}>
            {getFlightDetail?.slices.map((slice, index) => (
              <>
                {index === 0 ? (
                  <Box display={"flex"}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      className={styles.onewayReturn}
                    >
                      <Typography>Outbound flight</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box display={"flex"}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      className={styles.onewayReturn}
                    >
                      <Typography>Return flight</Typography>
                    </Box>
                  </Box>
                )}

                <FromAndToDetail
                  key={index} // Always add a unique key when mapping
                  getdata={slice}
                  logo={getFlightDetail?.owner?.logo_symbol_url}
                />
              </>
            ))}
          </Box>
        </Box>

        {/* Footer Section */}
        <BookingDrawerFooter getFlightDetails={getFlightDetail} />
      </Box>
      <Box
        onClick={HandlecloseDrawer}
        className={styles.checkoutDrowerBackdrop}
      ></Box>
    </Box>
  );
};

export default BookingDrawer;
