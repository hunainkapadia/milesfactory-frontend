import { useSelector } from "react-redux";
import LoadingArea from "../../LoadingArea";
import PassengerInfo from "../../Checkout/PassengerInfo";
import PriceSummary from "../../Checkout/PriceSummary";
import PaymentDrawer from "../../Checkout/PaymentDrawer";
import { Box } from "@mui/material";
import PaymentAddCardDrawer from "../../Checkout/PaymentAddCardDrawer";
import PaymentSuccess from "../../Checkout/PaymentSuccess";

const PassengerFlowBlock = ({
  aiMessage,
  GetViewPassengers,
  filledPassenger,
  orderDetail,
  paymentSuccess,
}) => {
  
  console.log("ai_pass_res", aiMessage?.ai?.passengerFlowRes);
  
  // Passenger info
  return (
    <>
      {/* Passenger Flow Loading */}
      {aiMessage?.ai?.passengerFlowRes?.isloading && (
        <Box my={3}>
          <LoadingArea />
        </Box>
      )}

      {/* Passenger Info */}
      {aiMessage?.ai?.passengerFlowRes?.status &&
        Array.isArray(GetViewPassengers) &&
        GetViewPassengers.length > 0 && (
          <PassengerInfo getdata={GetViewPassengers} />
        )}

      {/* Payment Flow */}
      {aiMessage?.ai?.passengerFlowRes?.status &&
        Array.isArray(GetViewPassengers) &&
        GetViewPassengers.length > 0 &&
        Array.isArray(filledPassenger) &&
        filledPassenger.length === GetViewPassengers.length && (
          <>
            {orderDetail ? (
              <PriceSummary />
            ) : (
              <Box my={3}>
                <LoadingArea />
              </Box>
            )}
            <PaymentDrawer />
            <PaymentAddCardDrawer />
            {paymentSuccess && <PaymentSuccess />}
          </>
        )}
    </>
  );
};

export default PassengerFlowBlock;
