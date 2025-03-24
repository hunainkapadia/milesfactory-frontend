import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const PassengersCard = ({
  passName,
  getdata,
  totalPass,
  isMainPassenger,
  isActive,
  onToggle,
  isFilled,
}) => {
  console.log("isFilled111", isFilled);

  return (
    <Grid
      container
      id={getdata.uuid}
      onClick={() => onToggle(getdata.uuid)} // Pass the UUID to toggle selection
      className={`${styles.passengersCard} ${
        isActive ? styles.Active : styles.Notactive
      }  ${isFilled ? styles.isFilled + " isFilled" : ""}
      ${!onToggle ? styles.disabledCard : ""}`}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Grid item
        xs={2}
        
        display={"flex"}
        alignItems={"center"}
        className="imggroup"
      >
        <img src="/images/user-circle.svg" />
      </Grid>
      <Grid xs={7} p={0} m={0} display={"flex"} alignItems={"center"}>
        <Box>
          <Typography className="f14 bold mb-0" mb={1}>
            Traveller {totalPass}
          </Typography>
          <Typography className="gray f12">{passName}</Typography>
          <Typography className="gray f12">{getdata.type}</Typography>
        </Box>
      </Grid>
      <Grid
        xs={3}
        p={0}
        m={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <h5 className="mb-0 basecolor1">
          {isFilled ? (
            <Box gap={1} display={"flex"} alignItems={"center"}>
              <i className="fas fa-check-circle basecolor1"></i>{" "}
            </Box>
          ) : (
            "Add"
          )}
        </h5>
      </Grid>
    </Grid>
  );
};

export default PassengersCard;
