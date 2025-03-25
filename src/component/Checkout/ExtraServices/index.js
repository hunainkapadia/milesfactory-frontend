import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Link from "next/link";

const ExtraServices = ({ getServicesdata, isFilled, selectedFlight }) => {
  console.log("selectedFlight", selectedFlight.total_amount);

  return (
    <Grid item xs={6}>
      <Box className={styles.passengersCard}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography className="mb-10" mb={1} variant="h6">
            {getServicesdata.given_name} {getServicesdata.family_name}
          </Typography>
          <Typography className="mb-10" mb={1} variant="h6">
            + € {Math.round(selectedFlight.total_amount)}
          </Typography>
        </Box>
        <Box>
          <Typography className="basecolor-dark">Adult</Typography>
        </Box>
        <Box gap={4} pt={3}>
          <Box display={"flex"} alignItems={"center"} gap={4} py={3}>
            <Box>
              <Typography className="basecolor-dark">
                <span className=" bold ">Seat:</span> 40E
              </Typography>
            </Box>
            <Link className="btn btn-link" href={""}>
              <Box
                display="flex"
                alignItems="center"
                className="basecolor1"
                gap={2}
              >
                <i className="fa fa-pencil"></i>
                <div>Change seat</div>
              </Box>
            </Link>
          </Box>
          {/*  */}
          <Typography mb={1} variant="h6">
            Included in ticket (BCN - CDG)
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Box>
                <img src={"/images/checkout/checked-bagg.svg"} />
              </Box>
              <Typography>10 x</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Box>
                <img src={"/images/checkout/carryon-bagg.svg"} />
              </Box>
              <Typography>10 x</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Box>
                <img src={"/images/checkout/personal-items.svg"} />
              </Box>
              <Typography>10 x</Typography>
            </Box>
          </Box>
          {/* baggage end */}
          <Link className="btn btn-link" href={""}>
            <Box
              display="flex"
              alignItems="center"
              className="basecolor1 bold"
              gap={2}
            >
              <i className="fa fa-plus"></i>
              <div>Add luggage</div>
            </Box>
          </Link>
        </Box>
      </Box>
      {/*  */}
    </Grid>
  );
};
export default ExtraServices;