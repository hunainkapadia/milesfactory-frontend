import { Box, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";

const BuilderHelpingCard = ({ getBuilder, forReturn, forHotel, forOneway }) => {


  
  
  return (
    <>
      <Box
        className={`${TripStyles.PaddDetailCard} PaddDetailCard`}
        mb={3}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box>
          <Chip
            variant="outlined"
            label={`${forHotel ? "Stay" : "Flights"}`}
            className={`${TripStyles.BuilderChip} wjite-bg bold `}
            sx={{}}
            size="small"
          />
        </Box>
        <Typography className="f12 bold">
          {forHotel
            ? "Need help finding the perfect stay?"
            : "Need help finding flights?"}
        </Typography>

        <Stack
          direction="row"
          flexWrap="nowrap"
          alignItems="flex-start"
          gap={1}
          justifyContent={"space-between"}
        >
          <Stack whiteSpace={"nowrap"} alignItems="center" textAlign={"center"}>
            <Typography className="f12">
              {forHotel ? "Check-in" : "Departing"}
            </Typography>
            <Typography whiteSpace={"nowrap"} className="f12 black bold">
            
              {forHotel && getBuilder?.departure_date
                ? new Date(getBuilder?.departure_date).toLocaleDateString(
                    "en-GB",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    }
                  )
                : forOneway && getBuilder?.from_destination
                ? getBuilder?.from_destination
                : forReturn && getBuilder?.to_destination
                ? getBuilder?.to_destination
                : "-"}

              {/* {forReturn
                ? getBuilder?.to_destination
                : forHotel
                ? getBuilder?.departure_date
                : getBuilder?.from_destination} */}
            </Typography>
          </Stack>
          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12" whiteSpace={"nowrap"}>
              {forHotel ? "Check-out" : "Arriving"}
            </Typography>
            <Typography whiteSpace={"nowrap"} className="f12 black bold">
              {forHotel && getBuilder?.return_date
                ? new Date(getBuilder?.return_date).toLocaleDateString(
                    "en-GB",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    }
                  )
                : forOneway && getBuilder?.to_destination
                ? getBuilder?.to_destination
                : forReturn && getBuilder?.from_destination
                ? getBuilder?.from_destination
                : "-"}
            </Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12" whiteSpace={"nowrap"}>
              {forHotel ? "Rooms" : "Class"}
            </Typography>
            <Typography whiteSpace={"nowrap"} className="f12 black bold capitalize">
              {forHotel
                ? "1"
                : forOneway && getBuilder?.cabin_class
                ? getBuilder?.cabin_class
                : forReturn && getBuilder?.cabin_class
                ? getBuilder?.cabin_class
                : "-"}
            </Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography whiteSpace={"nowrap"} className="f12">Travellers</Typography>
            <Typography className="f12 black bold" >
             {(getBuilder?.passengers?.adults ||
  getBuilder?.passengers?.children?.length > 0 ||
  (!forHotel && getBuilder?.passengers?.infants?.length > 0)) && (
  <Box className={TripStyles.tripDetailsCol + " f12 black bold"}>

    {(() => {
      const adults = getBuilder?.passengers?.adults || 0;
      const children = getBuilder?.passengers?.children?.length || 0;
      const infants = getBuilder?.passengers?.infants?.length || 0;

      // If hotel → Combine children + infants
      const hotelChildrenCount = forHotel ? children + infants : children;

      return [
        adults > 0 && `${adults} ${adults === 1 ? "adult" : "adults"}`,

        hotelChildrenCount > 0 &&
          `${hotelChildrenCount} ${
            hotelChildrenCount === 1 ? "child" : "children"
          }`,

        // Only show infants count for flight
        !forHotel && infants > 0 &&
          `${infants} ${infants === 1 ? "infant" : "infants"}`,
      ]
        .filter(Boolean)
        .join(", ");
    })()}
  </Box>
)}


            </Typography>
          </Stack>
        </Stack>
        {/* <Box display={"flex"} justifyContent={"flex-end"}>
            <Button className="btn btn-white btn-sm btn-round">Search flights in Chat</Button>
          </Box> */}
      </Box>
    </>
  );
};

export default BuilderHelpingCard;
