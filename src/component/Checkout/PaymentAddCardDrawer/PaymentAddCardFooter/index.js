import { Box, Divider, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const PaymentAddCardFooter = ({HandlecloseDrawer}) => {
  return (
    <>
      <Box
        className={styles.checkoutDrowerFooter + " test11"}
        position="absolute"
      >
        <Divider />

        {/* Footer Content */}
        
          {/* Price Row */}
          <Box
            px={3}
            py={2}
            display={"flex"}
            justifyContent={"space-between"}
          >
            {/* Price Section */}
            <Box flexDirection="column">
              <Box
                className={styles.priceSection}
                gap={1}
              >
                
              </Box>
            </Box>

            {/* Actions Section */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={3}
            >
              {/* Close Button */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="gray f14"
                style={{ cursor: "pointer" }}
                onClick={HandlecloseDrawer}
              >
                <span>Cancel</span>
              </Box>

              {/* Select Flight Button */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="basecolor1"
              >
                <button 
                  className={
                    styles.selectFlightBtn + " btn btn-primary btn-md btn-round"
                  }
                  onClick={"handleBookFlight"}
                >
                  <Box display="flex" gap={1}>
                    <Box>Save card</Box>
                  </Box>
                </button>
              </Box>
            </Box>
          </Box>
        
      </Box>
    </>
  );
};

export default PaymentAddCardFooter;
