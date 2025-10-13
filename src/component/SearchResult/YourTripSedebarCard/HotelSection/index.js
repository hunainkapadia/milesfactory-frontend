import { Box, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import BuilderHelpingCard from "../BuilderHelpingCard";
import HotelCardSidebar from "../HotelCardSidebar";
import { useSelector } from "react-redux";

const HotelSection = ({
  Carduuid,
  getBuilder,
  forReturn,
  forHotel,
  forOneway,
}) => {
  const CartDetails = useSelector(
    (state) => state.booking.getCartDetail?.items
  );
  const hasHotel = Array.isArray(CartDetails?.items)
    ? CartDetails.some((item) => item?.offer_type === "hotel")
    : false;
  {
    console.log("hasHotel_111", getBuilder);
  }

  return (
    <>
      <Box mb={3}>
        <Box mb={2} display="flex" alignItems="center" gap="12px">
          <Typography
            className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
          >
            Hotel for {getBuilder?.to_destination || "your trip"}
          </Typography>
        </Box>
        <Typography className="f12" sx={{ whiteSpace: "pre-line" }}>
          use mylz to search and book hotel
        </Typography>
      </Box>
      {!hasHotel ? (
        <>
          {CartDetails?.map((getItems, index) =>
            getItems?.raw_data?.hotel ? (
              <>
                <HotelCardSidebar
                  key={index}
                  hotel={getItems?.raw_data?.hotel}
                  Carduuid={Carduuid}
                />
              </>
            ) : null
          )}
        </>
      ) : (
        <>
          <BuilderHelpingCard getBuilder={getBuilder} forHotel />
        </>
      )}
    </>
  );
};

export default HotelSection;
