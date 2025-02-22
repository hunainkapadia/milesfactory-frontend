import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Link from "next/link";

const FromAndToDetail = () => {
  return (
    <>
      
      <Box className={styles.detailsSection} px={3}>
        <Box display={"flex"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            className="normalOption fastestOption"
          >
            <Typography>
              <span>Fastest option</span>
            </Typography>
          </Box>
        </Box>
        {/* from and to row */}

        <Box
          className={styles.fromAndToRow}
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          my={3}
        >

          <Box
            className={styles.FromRow}
            position={"relative"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={4}>
              <Typography variant="h5" className="h6 mb-0">
                06:50 AM
              </Typography>
              <Typography variant="h5" className="h6 mb-0">
                Amsterdam (AMS)
              </Typography>
            </Box>
            <Box display={"flex"} gap={4}>
              <Typography variant="p" className=" gray mb-0">
                Sat, Dec 14
              </Typography>
            </Box>
          </Box>
          {/* time */}
          <Box
            className={styles.flightDurationRow + " gray"}
            position={"relative"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={1}>
              <Typography variant="p" className="mb-0">
                38h20m
              </Typography>
              <Typography variant="p" className="mb-0 red">
                2 stops (DOH - SIN)
              </Typography>
            </Box>
          </Box>
          {/* time */}
          <Box
            position={"relative"}
            className={styles.ToRow}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={4}>
              <Typography variant="h5" className="h6 mb-0">
                06:50 AM
              </Typography>
              <Typography variant="h5" className="h6 mb-0">
                Amsterdam (AMS)
              </Typography>
            </Box>
            <Box display={"flex"} gap={4}>
              <Typography variant="p" className=" gray mb-0">
                Sat, Dec 14
              </Typography>
            </Box>
          </Box>
        </Box>
        {/*  */}
        <Box>
        <Box  mt={2}>
                      <Link href={""} className="text-decoration-none darkgray">
                        <Box
                          mt={4}
                          mb={4}
                          gap={2}
                          alignItems={"center"}
                          display={"flex"}
                        >
                          <span>Flight details</span>
                          <i className="fa-caret-down fa fas"></i>
                        </Box>
                      </Link>
                    </Box>
          <Divider />
          <Box mb={2} pt={3}>
            <Typography variant="h4" className=" mb-0 h4">
              Included in ticket
            </Typography>
          </Box>
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>

          {/*  */}
          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            px={1}
            mb={1}
            className={styles.normalOption}
          >
            <div>
              <img src="/images/handcarry-icon.svg" />
            </div>
            <Typography>1x carry-on bag</Typography>
          </Box>
          {/*  */}
        </Box>
      </Box>
    </>
  );
};

export default FromAndToDetail;
