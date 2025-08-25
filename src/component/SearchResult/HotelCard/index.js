import { Box, Card, Typography, Grid, Button, Stack, Tooltip } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/HotelCard.module.scss";

const HotelCard = ({hotel}) => {
  return (
    <>
      <Box className={`${searchResultStyles.HotelCard}`}>
        <Grid container>
          {/* Left Section */}
          <Grid
            className={searchResultStyles.CardLeft}
            lg={9}
            md={9}
            xs={12}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap:"10px" }}
          >
            <Box
              className={searchResultStyles.HotelThumb}
              sx={{
                backgroundImage: `url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/108437040.jpg?k=8b7d88be5a0a7ea5a7bb24425ae6472f392a1f641eee26f392c7528b959c76b1&o=&hp=1")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />

            <Box component={"section"}>
              <Stack
                mb={"4px"}
                flexDirection={"row"}
                gap={"6px"}
                alignItems={"center"}
              >
                <Typography className="bold mb-1 f12" textTransform={"capitalize"}>
                  {hotel?.name}
                </Typography>
                <Typography className={" chip sm chipGray"}>
                  30% discount
                </Typography>
                <Typography className={" chip sm chipPrimary"}>
                  #1 Best
                </Typography>
              </Stack>
              <Stack mb={"10px"} flexDirection={"row"}>
                {/* Rating */}
                <Typography
                  className="f8 black-50"
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <i className="fas fa-star black-50"></i>
                  <Typography component={"span"} className=" f8 black">
                    4.5
                  </Typography>
                  <Typography component={"span"} className="f8 black-50">
                    (212 reviews)
                  </Typography>
                  <i className="fas fa-map-marker-alt black-50"></i>
                  0.2km from search location · Paris
                </Typography>
              </Stack>
              {/*  */}
              <Stack
                mb={"4px"}
                flexDirection={"row"}
                gap={"6px"}
                alignItems={"center"}
              >
                <Typography className="bold mb-1 f12">
                  1 double room, 2 adults ·
                </Typography>
                <Typography component={"span"} className="f8 black-50">
                  20 Jun - 21 June
                </Typography>
              </Stack>
              <Typography className="black-50 f10" variant="body2">
                Breakfast included · Free cancellation until 18 June · Pay at
                hotel
              </Typography>
              <Stack mt={"12px"} flexDirection={"row"} alignItems={"center"} gap={"13px"}>
                <Tooltip
                  title="Dummy content Changes"
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <Box
                    className="imggroup"
                    sx={{
                      display: "inline-block",
                      pointerEvents: "auto",
                    }}
                  >
                    <img
                      width={14}
                      src="/images/hotel/hotel-bed-icon.svg"
                      alt="Free Change"
                    />
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Dummy content Changes"
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <Box
                    className="imggroup"
                    sx={{
                      display: "inline-block",
                      pointerEvents: "auto",
                    }}
                  >
                    <img
                      width={14}
                      src="/images/hotel/hotel-bed2-icon.svg"
                      alt="Free Change"
                    />
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Dummy content Changes"
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <Box
                    className="imggroup"
                    sx={{
                      display: "inline-block",
                      pointerEvents: "auto",
                    }}
                  >
                    <img
                      width={14}
                      src="/images/hotel/hotel-wifi-icon.svg"
                      alt="Free Change"
                    />
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Dummy content Changes"
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <Box
                    className="imggroup"
                    sx={{
                      display: "inline-block",
                      pointerEvents: "auto",
                    }}
                  >
                    <img
                      width={14}
                      src="/images/hotel/hotel-leav-icon.svg"
                      alt="Free Change"
                    />
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Dummy content Changes"
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <Box
                    className="imggroup"
                    sx={{
                      display: "inline-block",
                      pointerEvents: "auto",
                    }}
                  >
                    <img
                      width={14}
                      src="/images/hotel/hotel-mosq-icon.svg"
                      alt="Free Change"
                    />
                  </Box>
                </Tooltip>
              </Stack>
            </Box>
          </Grid>

          {/* Right Section (Price + Button) */}
          <Grid
            className={searchResultStyles.CardRight}
            width={"100%"}
            lg={3}
            md={3}
            gap={2}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box
              className={searchResultStyles.Box}
              display={"flex"}
              sx={{
                flexDirection: { xs: "column", lg: "column", md: "column" },
              }}
              justifyContent={"center"}
              height={"100%"}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "column", lg: "column", xs: "row" },
                }}
              >
                {/* See Details (static) */}
                <Box style={{ cursor: "pointer" }}>
                  <Box className="text-decoration-none basecolor1">
                    <Box
                      gap={"4px"}
                      alignItems={"center"}
                      display={"flex"}
                      className="bold f12"
                      sx={{ fontSize: { xs: "12px", md: "16px" } }}
                    >
                      <span>See details</span>
                      <i className="fa-angle-right fa fas"></i>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Price + Select Button */}
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  flexDirection: { lg: "column", md: "column", xs: "row" },
                  width: { lg: "100%", md: "100%", xs: "100%" },
                  justifyContent: "space-between",
                  alignItems: {
                    lg: "flex-start",
                    md: "flex-start",
                    xs: "center",
                  },
                }}
                gap={1}
                className={searchResultStyles.PriceBottom}
              >
                <Box>
                  <Typography
                    className={
                      searchResultStyles.flightPriceSection + " mb-0 black bold"
                    }
                  >
                    £340 / night
                  </Typography>
                  <Typography className="f12 black-50">
                    £680 total
                  </Typography>
                </Box>

                <Box sx={{ width: { lg: "100%", md: "100%", xs: "auto" } }}>
                  <Button
                    className={
                      "w-100 btn btn-primary btn-round btn-md " +
                      searchResultStyles.selectFlightBtn
                    }
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HotelCard;
