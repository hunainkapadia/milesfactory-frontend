import { Box, Button, Typography } from "@mui/material";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatscroll,
  setIsBuilderDialog,
} from "@/src/store/slices/Base/baseSlice";
import {
  getPassPofile,
  PassengerForm,
} from "@/src/store/slices/passengerDrawerSlice";
import {
  getPassPofileHotel,
  PassengerSetupHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";

const SidebarFooter = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const { cartType, isCartSuccess, getCartDetail, cartTotalPrice } = useSelector((state) => state?.booking);
  const sendMessages = useSelector((state) => state.sendMessage?.messages || []);
  const issystemmessage = useSelector((state) => state?.sendMessage?.systemMessage);

  // Cart logic constants
  const cartItemsCount = getCartDetail?.items?.length || 0;
  const hasItems = cartItemsCount > 0;
  
  // Sentence logic: "1 item in cart" vs "2 items in cart"
  const itemLabel = cartItemsCount === 1 ? "item" : "items";
  const cartSummaryText = `${cartItemsCount} ${itemLabel} in cart`;

  const handleBookFlight = () => {
    dispatch(setChatscroll(true));
    
    // Logic to open correct drawer based on cart contents
    if (cartType === "flight") {
      dispatch(setIsBuilderDialog(false));
      dispatch(PassengerForm());
      dispatch(getPassPofile());
    } else if (cartType === "hotel") {
      dispatch(PassengerSetupHotel());
      dispatch(getPassPofileHotel());
    } else if (cartType === "all") {
      dispatch(PassengerForm());
      dispatch(getPassPofile());
      dispatch(PassengerSetupHotel());
    }
  };

  // Condition to show checkout: Cart is successful, no active typing/pending messages, and has items
  const canShowCheckout = isCartSuccess && (issystemmessage || sendMessages.length === 0) && hasItems;

  return (
    <Box
      px={"18px"}
      py={"14px"}
      component={"footer"}
      className={YourtripStyles.Footer}
      sx={{ 
        borderTop: "solid 1px #E6EEEE", 
        backgroundColor: "#fff",
        position: 'sticky',
        bottom: 0,
        zIndex: 10
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          {hasItems ? (
            <>
  <Typography
    variant="caption"
    display="block"
    className="gray"
    sx={{ fontWeight: 500, lineHeight: 1.2, mb: 0.2 }}
  >
    {cartSummaryText}
  </Typography>

  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
    <h4 className="exbold mb-0" style={{ fontSize: "1.1rem", color: "#111", margin: 0 }}>
      {currencySymbols[getCartDetail?.items?.[0]?.currency] || getCartDetail?.items?.[0]?.currency}
      {Math.round(cartTotalPrice).toLocaleString()}
    </h4>

    {cartItemsCount === 1 && (
      <Typography className="f12 black-50" sx={{ lineHeight: 1.1 }}>
        Add more plans
      </Typography>
    )}
  </div>
</>
          ) : (
            <>
              <Typography className="f12 black-50">Your cart is empty</Typography>
              <h4 className="exbold mb-0" style={{ opacity: 0.3 }}>—</h4>
            </>
          )}
        </Box>

        {canShowCheckout && (
          <Box textAlign="right">
            <Button
              onClick={handleBookFlight}
              className="btn btn-primary btn-round btn-xs"
              sx={{ 
                textTransform: 'none', 
                px: 3, 
                fontWeight: 700,
                fontSize: '13px',
                boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.2)' 
              }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SidebarFooter;