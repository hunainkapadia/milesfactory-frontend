import { Box, Grid, Stack, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
const NotfoundCard = () => {
  const flightcount = useSelector(
    (state) => state?.sendMessage?.appendFlights?.ai?.count
  );
  return (
    <Box className={`${styles.NotfoundCard}`} justifyContent={"center"}>
      <Grid container>
        <Grid className={styles.CardLeft} lg={9} md={9} xs={12}>
          {/* footer */}
          {/* FromAndTo with logo */}
          <Stack
            sx={{ flexDirection: { md: "row", xs: "column" } }}
            alignItems={"center"}
            gap={{ md: "25px", xs: "6px" }}
            p={"10px"}
            height={"100%"}
          >
            <Box
              sx={{ width: { md: "76px" } }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                className="imggroup"
                sx={{ width: { xs: "45px" } }}
              >
                <img src="/images/search-icon-lg.svg" />
              </Box>
            </Box>
            <Box>
              <Typography
                className="mb-0"
                variant="h6"
                classes={"black"}
                sx={{
                  fontSize: { md: "18px", xs: "16px" },
                  fontWeight: 600,
                  mb: 1,
                  textAlign: { md: "left", xs: "center" },
                }}
              >
                Not finding what you want?
              </Typography>
              <Typography
                className="black-50"
                variant="body2"
                sx={{
                  fontSize: { md: "12px", xs: "10px" },
                  textAlign: { md: "left", xs: "center" },
                }}
              >
                Try adjusting the filters or sort order
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Price Section */}
        <Grid
          className={styles.CardRight}
          width={"100%"}
          lg={3}
          md={3}
          gap={2}
          display={"flex"}
          flexDirection={"column"}
          sx={{ height: { md: "130px", xs: "auto" } }}
        >
          <Box
            className={styles.Box}
            display={"flex"}
            sx={{
              flexDirection: {
                xs: "column",
                lg: "column",
                md: "column",
              },
              textAlign: { md: "left", xs: "center" }
            }}
            justifyContent={"center"}
            height={"100%"}
            
          >
            <Typography  className={" mb-0 black-50 bold"}>
              {flightcount.toLocaleString()} results
            </Typography>
            <Typography className=" f11 black-50">
              Narrow down your search
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotfoundCard;
