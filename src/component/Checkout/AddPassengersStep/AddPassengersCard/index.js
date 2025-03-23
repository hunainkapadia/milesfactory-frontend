import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const AddPassengersCard = ({
  passName,
  getdata,
  totalPass,
  isMainPassenger,
  isActive,
  onToggle,
}) => {
  return (
    <Grid
      container
      id={getdata.uuid}
      onClick={() => onToggle(getdata.uuid)} // Pass the UUID to toggle selection
      className={`${styles.passengersCard} ${
        isActive ? styles.Active : styles.Notactive
      }`}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Grid xs={2} p={0} m={0} display={"flex"} alignItems={"center"} className="imggroup">
          <img src="/images/user-circle.svg" />
      </Grid>
      <Grid xs={8} p={0} m={0} display={"flex"} alignItems={"center"}>
        <Box>
          <Typography className="f14 bold mb-0" mb={1}>
            Traveller {totalPass}
          </Typography>
          <Typography className="gray f12">{passName}</Typography>
          <Typography className="gray f12">{getdata.type}</Typography>
        </Box>
      </Grid>
      <Grid xs={2} p={0} m={0} display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
        <h5 className="mb-0 basecolor1">Add</h5>
      </Grid>
    </Grid>
  );
};

export default AddPassengersCard;