import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/search-result/SearchFilterBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookingDrawer,
  setflightDetail,
  setHotelDrawer,
  setOpenDrawer,
  setSingleFlightData,
} from "@/src/store/slices/BookingflightSlice";
import FilterParams from "../YourTripSidebar/FilterParams";
import { setSeeDetailButton } from "@/src/store/slices/passengerDrawerSlice";
import { event } from "@/src/utils/utils";
import { setSinglehotel } from "@/src/store/slices/HotelSlice";

const SearchFilterBar = () => {
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );

  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  const hotelArgument =  SearchHistory?.hotel?.HotelArgument || SearchHistory?.hotel

  const hotelPassengers = hotelArgument?.passengers || hotelArgument

  console.log("SearchHistory", hotelArgument);
  

  const dispatch = useDispatch();
  //   for selct flight detail

  //   for selct flight detail end

  const getCartHotel = useSelector(
    (state) => state?.booking?.addCart?.raw_data?.hotel
  );

  const CartOfferDetail = useSelector(
    (state) => state.booking?.getCartDetail?.items
  );

  // filter flight + hotel separately
  const CartFlight = CartOfferDetail?.find((item) => item?.raw_data?.slices);
  const CartHotel = CartOfferDetail?.find((item) => item?.raw_data?.hotel);

  const HandleSelectDrawer = () => {
    if (CartFlight) {
      dispatch(setBookingDrawer(true));
      dispatch(setSingleFlightData(CartFlight.raw_data));
    }
  };

  const handleHotelDrawer = () => {
    if (CartHotel) {
      dispatch(setSinglehotel(CartHotel.raw_data?.hotel));
      dispatch(setHotelDrawer(true));
    }
  };

  return (
    <>
      {SearchHistory?.flight ? (
        <>
          <Box
            component={"main"}
            className={styles.SearchFilterBar}
            display={"flex"}
          >
            <Box
              component={"section"}
              className={styles.Content}
              gap={2}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/*  */}
              <Box
                sx={{ gap: { md: "12px", xs: "10px" } }}
                display={"flex"}
                alignItems={"center"}
              >
                <Box className=" imggroup">
                  {CartOfferDetail?.length > 0 ? (
                    <img
                      width={20}
                      height={20}
                      src="/images/success-check.svg"
                    />
                  ) : (
                    <img width="20" src="/images/plane-icon-basecolor1.svg" />
                  )}
                </Box>
                <Box
                  className={styles.Header2 + " aaa"}
                  display="flex"
                  flexDirection={{ md: "row", xs: "column" }}
                  alignItems={{ md: "center", xs: "flex-start" }}
                  rowGap={{ md: 0, xs: "1px" }}
                >
                  {SearchHistory?.flight ? (
                    <>
                      <Box mr={3}>
                        <Typography
                          className="bold black"
                          sx={{ fontSize: { md: "12px", xs: "10px" } }}
                        >
                          {SearchHistory?.flight?.from_title} -{" "}
                          {SearchHistory?.flight?.to_title}
                        </Typography>
                      </Box>
                      <Box
                        className={styles.filterRrow}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <Typography className=" black regular">
                          {SearchHistory?.flight?.departure_date ? (
                            <>
                              {new Date(
                                SearchHistory?.flight?.departure_date
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })}
                            </>
                          ) : (
                            ""
                          )}
                          {SearchHistory?.flight?.arrival_date ? (
                            <>
                              {" - "}
                              {new Date(
                                SearchHistory?.flight?.arrival_date
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </Typography>
                        <Typography className=" black regular">
                          {SearchHistory?.flight?.flight_type == "round-trip"
                            ? "Return"
                            : "One way"}
                        </Typography>
                        <Typography className="black regular">
                          {[
                            SearchHistory?.flight?.adults > 0 &&
                              `${SearchHistory?.flight?.adults} ${
                                SearchHistory?.flight?.adults === 1
                                  ? "adult"
                                  : "adults"
                              }`,
                            SearchHistory?.flight?.children > 0 &&
                              `${SearchHistory?.flight?.children} ${
                                SearchHistory?.flight?.children === 1
                                  ? "child"
                                  : "children"
                              }`,
                            SearchHistory?.flight?.infants > 0 &&
                              `${SearchHistory?.flight?.infants} ${
                                SearchHistory?.flight?.infants === 1
                                  ? "infant"
                                  : "infants"
                              }`,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </Typography>
                      </Box>
                      <Box
                        className={styles.filterRrow2}
                        display={"flex"}
                        pl={{ md: 3, xs: 0 }}
                        alignItems={"center"}
                      >
                        <FilterParams />
                      </Box>
                      {/*  */}
                    </>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
              <Box>
                {CartOfferDetail?.length > 0 && (
                  <Box style={{ cursor: "pointer" }}>
                    <Box
                      onClick={HandleSelectDrawer}
                      className="text-decoration-none cursor-pointer"
                    >
                      <Box
                        gap={"4px"}
                        alignItems={"center"}
                        display={"flex"}
                        className=" basecolor1 semibold"
                        sx={{ fontSize: { md: "12px", xs: "10px" } }}
                      >
                        <span>See details</span>
                        <i className="fa-angle-right fa fas"></i>{" "}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            {/*  */}
          </Box>
        </>
      ) : hotelArgument ? (
        <>
          <Box
            component={"main"}
            className={styles.SearchFilterBar}
            display={"flex"}
          >
            <Box
              component={"section"}
              className={styles.Content}
              gap={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box
                sx={{ gap: { md: "12px", xs: "8px" } }}
                display={"flex"}
                alignItems={"center"}
              >
                <Box className="imggroup">
                  {CartOfferDetail?.length > 0 ? (
                    <img
                      width={20}
                      height={20}
                      src="/images/success-check.svg"
                    />
                  ) : (
                    <img width="20" src="/images/hotel/hotel-bed.svg" />
                  )}
                </Box>

                {/* 🔹 Static Destination + Dates + Passengers */}
                <Box
                  className={styles.Header2 + " bbb"}
                  display="flex"
                  flexDirection={{ md: "row", xs: "column" }}
                  alignItems={{ md: "center", xs: "flex-start" }}
                  rowGap={{ md: 0, xs: "1px" }}
                >
                  {hotelArgument?.destination || hotelArgument?.to_destination && (
                    <Box mr={3}>
                      <Typography
                        className="bold black"
                        sx={{ fontSize: { md: "12px", xs: "10px" } }}
                      >
                        {hotelArgument?.to_destination || hotelArgument?.destination}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    className={styles.filterRrow}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Typography className="black regular">
                      {new Date(
                        hotelArgument?.check_in || hotelArgument?.departure_date
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                      {" - "}
                      
                      {new Date(
                        hotelArgument?.check_out || hotelArgument?.return_date
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </Typography>
                    <Typography className="black regular">
                      {[
                        // Adults
                        hotelPassengers?.adults > 0 &&
                          `${hotelPassengers?.adults} ${
                            hotelPassengers?.adults === 1
                              ? "adult"
                              : "adults"
                          }`,

                        // Children (fix: use length instead of array itself)
                        hotelPassengers?.children?.length >
                          0 &&
                          `${
                            hotelPassengers?.children?.length
                          } ${
                            hotelPassengers?.children
                              ?.length === 1
                              ? "child"
                              : "children"
                          }`,

                        // Infants
                        hotelPassengers?.infants > 0 &&
                          `${hotelPassengers?.infants} ${
                            hotelPassengers?.infants === 1
                              ? "infant"
                              : "infants"
                          }`,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </Typography>
                  </Box>
                  <Box
                    className={styles.filterRrow2}
                    display={"flex"}
                    pl={{ md: 3, xs: 0 }}
                    alignItems={"center"}
                  >
                    <FilterParams />
                  </Box>

                  <Box
                    className={styles.filterRrow2}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {/* <Typography
                        className=" gray mb-0"
                        sx={{ fontSize: { xs: "8px", lg: "12px", md: "12px" } }}
                      >
                        Extra: breakfast
                      </Typography> */}
                  </Box>
                </Box>
              </Box>

              <Box>
                {CartOfferDetail?.length > 0 && (
                  <Box style={{ cursor: "pointer" }}>
                    <Box
                      onClick={() => handleHotelDrawer()}
                      className="text-decoration-none cursor-pointer"
                    >
                      <Box
                        gap={"4px"}
                        alignItems={"center"}
                        display={"flex"}
                        className=" basecolor1 semibold"
                        sx={{ fontSize: { md: "12px", xs: "10px" } }}
                      >
                        <span>See details</span>
                        <i className="fa-angle-right fa fas"></i>{" "}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchFilterBar;
