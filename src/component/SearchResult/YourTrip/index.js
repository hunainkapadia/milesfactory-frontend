import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const YourTrip = () => {
  return (
    <>
      <Box
        className={styles.YourTripSidebar}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          className={styles.YourTripCard}
          p={0}
        >
          <Box className={styles.CardHeader} px={3} py={3}>
            <h5 className="mb-0 regular">Your trip</h5>
          </Box>
          <Box px={3} pt={2} pb={5}>
            <Box mb={1}>
              <h4 className="mb-0">London to Bangkok</h4>
            </Box>
            <Box className=" gray" mb={5}>
              <Typography className="mb-0 f12">
                  Return, 2 Travellers
              </Typography> 
            </Box>

            <Box className=" Loading"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default YourTrip;
