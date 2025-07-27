import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useSelector } from "react-redux";

const SidebarTripDetails = () => {
   const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const BuilderArguments =
    getBuilder?.silent_function_template?.[0]?.function?.arguments;
  return (
    <>
      <Box mb={3}>
        <Box mb={1}>
          <Box display={"flex"} alignItems={"center"} gap={"12px"}>
            <Typography
              className={TripStyles.onewayReturn + " btn btn-xs btn-black "}
            >
              Outbound |{" "}
              {
                BuilderArguments?.departure_date && 
                  new Date(BuilderArguments?.departure_date).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })
              }
            </Typography>
            <Typography className="f12 semibold">
              {BuilderArguments?.from_destination}
            </Typography>
          </Box>
        </Box>
        <Typography className="f12">
          {/* Arrive in Bangkok and unwind – check-in opens at 4pm. */}
        </Typography>
      </Box>

      <Box
        className={`${TripStyles.PaddDetailCard} PaddDetailCard`}
        mb={3}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box>
          <Chip
            variant="outlined"
            label="Flights"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              borderColor: "#DEE1E6",
            }}
            size="small"
          />
        </Box>
        <Typography className="f12 semibold">
          Need help finding flights?
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Departure</Typography>
            <Typography className="f12 semibold">
              {
                BuilderArguments?.departure_date && 
                  new Date(BuilderArguments?.departure_date).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })
              }
            </Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Return</Typography>
            <Typography className="f12 semibold">
              {
                BuilderArguments?.return_date && // This is the condition
                  new Date(BuilderArguments.return_date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })
              }
            </Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Class</Typography>
            <Typography className="f12 semibold">Eco</Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Travellers</Typography>
            <Typography className="f12 semibold">
              {(BuilderArguments?.passengers?.adults ||
                BuilderArguments?.passengers?.children?.length > 0 ||
                BuilderArguments?.passengers?.infants?.length > 0) && (
                <Box
                  className={TripStyles.tripDetailsCol + " f12 black semibold"}
                >
                  {[
                    BuilderArguments?.passengers?.adults > 0 &&
                      `${BuilderArguments.passengers.adults} ${
                        BuilderArguments.passengers.adults === 1
                          ? "adult"
                          : "adults"
                      }`,
                    BuilderArguments?.passengers?.children?.length > 0 &&
                      `${BuilderArguments.passengers.children.length} ${
                        BuilderArguments.passengers.children.length === 1
                          ? "child"
                          : "children"
                      }`,
                    BuilderArguments?.passengers?.infants?.length > 0 &&
                      `${BuilderArguments.passengers.infants.length} ${
                        BuilderArguments.passengers.infants.length === 1
                          ? "infant"
                          : "infants"
                      }`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Box>
              )}
            </Typography>
          </Stack>
        </Stack>
          {/* <Box display={"flex"} justifyContent={"flex-end"}>
            <Button className="btn btn-white btn-sm btn-round">Search flights in Chat</Button>
          </Box> */}
      </Box>

      <Box mb={3}>
        <Box mb={1}>
          <Box display={"flex"} alignItems={"center"} gap={"12px"}>
            <Typography
              className={TripStyles.onewayReturn + " btn btn-xs btn-black"}
            >
              Return |{" "}
              {
                BuilderArguments?.return_date && // This is the condition
                  new Date(BuilderArguments.return_date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })
              }
            </Typography>
            <Typography className="f12 semibold">
              {BuilderArguments?.to_destination}
            </Typography>
          </Box>
        </Box>
        <Typography className="f12">
          {/* Departure. Check out and head to the airport for your flight. */}
        </Typography>
      </Box>
    </>
  );
};

export default SidebarTripDetails;
