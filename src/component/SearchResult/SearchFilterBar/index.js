import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/search-result/SearchFilterBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setflightDetail, setOpenDrawer } from "@/src/store/slices/BookingflightSlice";

const SearchFilterBar = () => {
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );

  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;
  console.log("SearchHistory2", SearchHistory?.children);

//   for selct flight detail
  const getselectedFlight = useSelector((state) => state?.booking?.flightDetail);
  console.log("getselectedFlight", getselectedFlight?.id);
  const dispatch = useDispatch();
  const offerkey = getselectedFlight?.id;
    const HandleSelectDrawer = () => {
      // Dispatch flight detail and open drawer
      if (offerkey) {
        dispatch(setOpenDrawer(offerkey)); //setSelectFlightKey empty then close drawer
        dispatch(setflightDetail(getselectedFlight)); // Store flight details
      }
    };
//   for selct flight detail end

  return (
    <>
      {SearchHistory && (
        <>
          <Box
            component={"main"}
            className={styles.SearchFilterBar}
            sx={{ display: { xs: "block", lg: "none", md: "none" } }}
          >
            <Box component={"section"} className={styles.Content} gap={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              {/*  */}
              <Box gap={2} display={"flex"} alignItems={"center"}>
                <Box className=" imggroup" sx={{ width: "28px" }}>
                  <img width="28" src="/images/plane-icon-basecolor1.svg" />
                </Box>
                {SearchHistory ? (
                  <Box className={styles.Header2 + " aaa"}>
                    <Box mb={"2px"}>
                      <Typography className="bold f10">
                        {SearchHistory?.from_title} - {SearchHistory?.to_title}
                      </Typography>
                    </Box>
                    <Box
                      mb={"3px"}
                      className={styles.filterRrow}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography className=" f12 black regular">
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
                      <Typography className=" f12 black regular">
                        {SearchHistory.flight_type == "round-trip"
                          ? "Return"
                          : "One way"}
                      </Typography>
                      <Typography className="f12 black regular">
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
                      <Typography fontSize={8} className=" gray regular">
                        Filters: none
                      </Typography>
                      <Typography fontSize={8} className=" gray regular">
                        Sorting: best match
                      </Typography>
                    </Box>
                    {/*  */}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
                <Box>
                  <Box style={{ cursor: "pointer" }}>
                          <Box
                            onClick={HandleSelectDrawer}
                            className="text-decoration-none cursor-pointer"
                          >
                            <Box
                              gap={1}
                              alignItems={"center"}
                              display={"flex"}
                              className=" basecolor1 semibold f12"
                            >
                              <span>See details</span>
                              <i className="fa-angle-right fa fas"></i>{" "}
                            </Box>
                          </Box>
                        </Box>
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
