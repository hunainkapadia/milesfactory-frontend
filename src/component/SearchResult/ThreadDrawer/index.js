import React from "react";
import {
  Box,
  Typography,
  Grid,
  Drawer,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setThreadDrawer } from "@/src/store/slices/Base/baseSlice";

const ThreadDrawer = () => {
  const dispatch = useDispatch();
  const ThreadDrawerOpen = useSelector((state) => state.base.ThreadDrawer);
  const ThreadData = useSelector((state) => state?.base?.ThreadData);

  const HandlecloseDrawer = () => {
    dispatch(setThreadDrawer(false));
  };

  const groupRecordsByDate = (data) => {
    const today = new Date();

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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

    console.log("Start of Today:", startOfToday);
    console.log("Start of Yesterday:", startOfYesterday);

    data.forEach((item) => {
      const itemDate = new Date(item.created_date);

      // Normalize itemDate to local timezone before truncating to midnight
      const localDate = new Date(itemDate.getTime() + itemDate.getTimezoneOffset() * 60000);
      const itemDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());

      console.log("Item:", item.name || "-", "UTC:", itemDate, "Local:", localDate, "→", itemDay);

      if (itemDay.getTime() === startOfToday.getTime()) {
        console.log("→ Grouped as Today");
        group.today.push(item);
      } else if (itemDay.getTime() === startOfYesterday.getTime()) {
        console.log("→ Grouped as Yesterday");
        group.yesterday.push(item);
      } else if (itemDay >= startOf7DaysAgo) {
        console.log("→ Grouped as Last 7 Days");
        group.last7Days.push(item);
      } else if (itemDay >= startOf30DaysAgo) {
        console.log("→ Grouped as Last 30 Days");
        group.last30Days.push(item);
      } else if (
        itemDay.getMonth() === lastMonth.getMonth() &&
        itemDay.getFullYear() === lastMonth.getFullYear()
      ) {
        console.log("→ Grouped as Last Month");
        group.lastMonth.push(item);
      } else {
        console.log("→ Grouped as Older");
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
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Drawer
      anchor="right"
      open={ThreadDrawerOpen}
      onClose={HandlecloseDrawer}
      className={`${styles.BaggageDrawer} BaggageDrawer`}
      transitionDuration={300}
    >
      <Box className={styles.BaggageDrawerSection} width={300}>
        <Box className={styles.BaggageDrawerBody}>
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                pt={3}
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
          <Box px={3}>
            {Object.keys(groupedRecords).map((groupKey) => {
              const records = groupedRecords[groupKey];
              if (records.length === 0) return null;

              return (
                <Box key={groupKey} pb={3}>
                  <Typography className="f12 exbold" pb={2}>
                    {groupLabels[groupKey]}
                  </Typography>
                  {records.map((item, i) => (
                    <Box key={i} pb={2}>
                      <Typography className="f12">
                        {formatDate(item.created_date)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ThreadDrawer;
