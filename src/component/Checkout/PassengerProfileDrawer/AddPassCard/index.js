import { ViewPassengersHotel } from "@/src/store/slices/passengerDrawerHotelSlice";
import { setAddNewPassactive, setisPassengerDrawer, setSelectedProfilePass, ViewPassengers } from "@/src/store/slices/passengerDrawerSlice";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const AddPassCard = () => {
   const dispatch = useDispatch();
   const CartType = useSelector((state) => state.booking.cartType);
   const handleAddPassenger = () => {
       dispatch(setSelectedProfilePass(null));
       dispatch(setisPassengerDrawer(true));

       if (CartType === "flight" || CartType === "all") {
         dispatch(ViewPassengers());
         dispatch(setAddNewPassactive(true));
       } else if (CartType === "hotel") {
         dispatch(ViewPassengersHotel());
       }
     };
  return (
    <Box pb={2} onClick={handleAddPassenger}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={3}
        gap={2}
        className={styles.addtravellerBtn + " basecolor1 cursor-pointer"}
      >
        <i className="fa fa-plus"></i>
        <Typography>Add new traveller</Typography>
      </Box>
    </Box>
  );
};

export default AddPassCard;
