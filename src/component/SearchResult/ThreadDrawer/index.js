import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setThreadDrawer } from "@/src/store/slices/Base/baseSlice";
import Link from "next/link";
import api from "@/src/store/api";
import { useRouter } from "next/router";
import {
  CreatesingleThread,
  historySingleThread,
  setThreadUuid,
} from "@/src/store/slices/sendMessageSlice";
import {
  clearGetMessages,
  fetchMessages,
} from "@/src/store/slices/GestMessageSlice";

const ThreadDrawer = () => {
  const dispatch = useDispatch();
  const ThreadDrawerOpen = useSelector((state) => state.base.ThreadDrawer);
  const ThreadData = useSelector((state) => state?.base?.ThreadData);

  console.log("ThreadData", ThreadData);

  const HandlecloseDrawer = () => {
    dispatch(setThreadDrawer(false));
  };

  const groupRecordsByDate = (data) => {
    // Sort by created_date DESC so newest is first
    const sortedData = [...data].sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );

    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const startOf7DaysAgo = new Date(startOfToday);
    startOf7DaysAgo.setDate(startOfToday.getDate() - 7);

    const startOf30DaysAgo = new Date(startOfToday);
    startOf30DaysAgo.setDate(startOfToday.getDate() - 30);

    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const group = {
      today: [],
      yesterday: [],
      last7Days: [],
      last30Days: [],
      lastMonth: [],
      older: [],
    };

    sortedData.forEach((item) => {
      const itemDate = new Date(item.created_date);

      const localDate = new Date(
        itemDate.getTime() + itemDate.getTimezoneOffset() * 60000
      );
      const itemDay = new Date(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      );

      if (itemDay.getTime() === startOfToday.getTime()) {
        group.today.push(item);
      } else if (itemDay.getTime() === startOfYesterday.getTime()) {
        group.yesterday.push(item);
      } else if (itemDay >= startOf7DaysAgo) {
        group.last7Days.push(item);
      } else if (itemDay >= startOf30DaysAgo) {
        group.last30Days.push(item);
      } else if (
        itemDay.getMonth() === lastMonth.getMonth() &&
        itemDay.getFullYear() === lastMonth.getFullYear()
      ) {
        group.lastMonth.push(item);
      } else {
        group.older.push(item);
      }
    });

    return group;
  };

  const groupedRecords = groupRecordsByDate(ThreadData || []);

  const groupLabels = {
    today: "Today",
    yesterday: "Yesterday",
    last7Days: "Previous 7 Days",
    last30Days: "Previous 30 Days",
    lastMonth: "Previous Month",
    older: "Older",
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format, set to false for 24-hour
    });
  };
  const theme = useTheme();
  // Check if the screen size is "small" or below (mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();
  const geturlUUID = useSelector((state) => state?.sendMessage?.threadUuid);
  const activeUUID = geturlUUID || router.query?.uuid;

  const handleSingleThread = (threaduuid) => {
    if (threaduuid) {
      window.location.href = `/chat/${threaduuid}`; // full browser reload
      dispatch(CreatesingleThread(threaduuid));
    }
  };

  const isloading = useSelector((state) => state.base.isloading);

  return (
    <Drawer
      anchor={isMobile ? "left" : "right"}
      open={ThreadDrawerOpen}
      onClose={HandlecloseDrawer}
      className={`${styles.ThreadDrawer} ThreadDrawer`}
      transitionDuration={200}
    >
      <Box
        className={styles.ThreadDrawerSection}
        sx={{ width: { lg: 300, md: 300, xs: 280 } }}
      >
        <Box
          component={"header"}
          alignItems={"center"}
          sx={{ display: { lg: "none", md: "none", xs: "flex" } }}
          gap={2}
          pt={1}
          pb={3}
          px={"24px"}
        >
          {/* Close Button */}
          <Box fontSize={"20px"}>
            <i
              onClick={HandlecloseDrawer}
              className="fa fa-arrow-left basecolor"
            ></i>
          </Box>
          <Box className={styles.Logo}>
            <Link href={"/"}>
              <Box
                sx={{ width: { xs: 53 } }}
                className="d-flex align-items-center imggroup"
              >
                <img src="/images/logo-color2.svg" />
              </Box>
            </Link>
          </Box>
        </Box>
        <Box className={styles.ThreadDrawerBody}>
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            alignItems="center"
            justifyContent="space-between"
            sx={{ display: { lg: "flex", md: "flex", xs: "none" } }}
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                pt={"19px"}
                px={"24px"}
              >
                <Box
                  onClick={HandlecloseDrawer}
                  className="cursor-pointer basecolor"
                >
                  <i className="fa fa-close fas"></i>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Display grouped records */}
          {isloading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              py={10}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : ThreadData?.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              py={10}
            >
              <Typography variant="body2" color="textSecondary">
                You don’t have any threads yet.
              </Typography>
            </Box>
          ) : (
            <Box>
              {Object.keys(groupedRecords).map((groupKey) => {
                const records = groupedRecords[groupKey];
                if (records.length === 0) return null;

                return (
                  <Box key={groupKey} pb={3}>
                    <Box px={"24px"}>
                      <Typography className="f12 exbold" pb={2}>
                        {groupLabels[groupKey]}
                      </Typography>
                    </Box>
                    <Box px={"14px"}>
                      {records.map((item, i) => (
                        <>
                          <Link
                            sx={{ px: "10px" }}
                            className={`${
                              styles.ThreadDrawerItem
                            } cursor-pointer text-decuration-none ${
                              activeUUID === item.uuid ? styles.active : ""
                            }`}
                            href={`/chat/${item.uuid}`}
                            key={item.uuid}
                            onClick={(e) => {
                              e.preventDefault(); // prevent immediate navigation
                              handleSingleThread(item.uuid); // will push and refresh
                            }}
                          >
                            <Typography className="f12">
                              {formatDate(item.created_date)}
                            </Typography>
                            {/* <Typography>{item.uuid}</Typography> */}
                          </Link>
                        </>
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
        {/* body */}
      </Box>
    </Drawer>
  );
};

export default ThreadDrawer;
