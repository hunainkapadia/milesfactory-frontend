import { useDispatch, useSelector } from "react-redux";
import LoadingArea from "../../LoadingArea";
import PassengerInfo from "../../Checkout/PassengerInfo";
import PriceSummary from "../../Checkout/PriceSummary";
import PaymentDrawer from "../../Checkout/PaymentDrawer";
import { Box } from "@mui/material";
import PaymentAddCardDrawer from "../../Checkout/PaymentAddCardDrawer";
import PaymentSuccess from "../../Checkout/PaymentSuccess";
import { setFilledPass } from "@/src/store/slices/passengerDrawerSlice";
import { useEffect } from "react";

const PassengerFlowBlock = ({
  aiMessage,
  GetViewPassengers,
  filledPassenger,
  orderDetail,
  paymentSuccess,
}) => {

  
  
  
  const FilledPass = useSelector((state) => state?.passengerDrawer?.filledPass);
  

  const dispatch = useDispatch();
  const allPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );
  const passengerPofile = useSelector(
    (state) => state?.passengerDrawer?.passProfile
  );
  
  // for active continue button if true all condition
  useEffect(() => {
    if ((!passengerPofile || passengerPofile.length === 0) && allPassengerFill) {
      dispatch(setFilledPass(true));
    }
  }, [passengerPofile, allPassengerFill, dispatch]);
    
      
  
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
      {FilledPass && aiMessage?.ai?.passengerFlowRes?.status &&
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
