import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/search-result/SearchFilterBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setflightDetail,
  setOpenDrawer,
} from "@/src/store/slices/BookingflightSlice";
import FilterParams from "../YourTripSidebar/FilterParams";
import { setSeeDetailButton } from "@/src/store/slices/passengerDrawerSlice";
import { event } from "@/src/utils/utils";

const SearchFilterBar = () => {
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );

  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  //   for selct flight detail
  const getselectedFlight = useSelector(
    (state) => state?.booking?.singleFlightData
  );
  const dispatch = useDispatch();
  const offerkey = getselectedFlight?.id;
  const HandleSelectDrawer = () => {
    // Dispatch flight detail and open drawer
    if (offerkey) {
      dispatch(setSeeDetailButton("Chat"))
      dispatch(setOpenDrawer(offerkey)); //setSelectFlightKey empty then close drawer
      dispatch(setflightDetail(getselectedFlight)); // Store flight details
    }
  };
  console.log("SearchHistory2", SearchHistory);


  //   for selct flight detail end

  return (
    <>
      {SearchHistory && (
        <>
          <Box
            component={"main"}
            className={styles.SearchFilterBar}
            sx={{ pb: { xs: 0, md: "10px" } }}
          >
            <Box
              component={"section"}
              className={styles.Content}
              gap={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {/*  */}
              <Box
                sx={{ gap: { md: "12px", xs: "8px" } }}
                display={"flex"}
                alignItems={"center"}
              >
                <Box className=" imggroup">
                  {offerkey ? (
                    <img
                      width={20}
                      height={20}
                      src="/images/success-check.svg"
                    />
                  ) : (
                    <img width="28" src="/images/plane-icon-basecolor1.svg" />
                  )}
                </Box>
                {SearchHistory ? (
                  <Box className={styles.Header2 + " aaa"}>
                    <Box mb={"2px"}>
                      <Typography
                        className="bold"
                        sx={{ fontSize: { md: "12px", xs: "10px" } }}
                      >
                        {SearchHistory?.from_title} - {SearchHistory?.to_title}
                      </Typography>
                    </Box>
                    <Box
                      mb={"3px"}
                      className={styles.filterRrow}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography className=" black regular">
                        {SearchHistory?.departure_date ? (
                          <>
                            {new Date(
                              SearchHistory?.departure_date
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </>
                        ) : (
                          ""
                        )}
                        {SearchHistory?.arrival_date ? (
                          <>
                            {" - "}
                            {new Date(
                              SearchHistory.arrival_date
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
                        {SearchHistory.flight_type == "round-trip"
                          ? "Return"
                          : "One way"}
                      </Typography>
                      <Typography className="black regular">
                        {[
                          SearchHistory?.adults > 0 &&
                            `${SearchHistory.adults} ${
                              SearchHistory.adults === 1 ? "adult" : "adults"
                            }`,
                          SearchHistory?.children > 0 &&
                            `${SearchHistory.children} ${
                              SearchHistory.children === 1
                                ? "child"
                                : "children"
                            }`,
                          SearchHistory?.infants > 0 &&
                            `${SearchHistory.infants} ${
                              SearchHistory.infants === 1 ? "infant" : "infants"
                            }`,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </Typography>
                    </Box>
                    <Box
                      className={styles.filterRrow2}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <FilterParams />
                    </Box>
                    {/*  */}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
              <Box>
                {offerkey && (
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
      )}
    </>
  );
};

export default SearchFilterBar;
