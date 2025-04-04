import { Box, Card, Typography } from "@mui/material";
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
  return (
    <Box
      id={getdata.uuid}
      onClick={() => onToggle(getdata.uuid)} // Pass the UUID to toggle selection
      className={`${styles.passengersCard} ${
        isActive ? styles.Active : styles.Notactive
      }  ${isFilled ? styles.isFilled + " isFilled" : ""}
      ${!onToggle ? styles.disabledCard : ""}`}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box className="" display={"flex"} gap={2}>
        <Box className="imggroup">
          <img src="/images/user-circle.svg" />
        </Box>
        <Box p={0} m={0}>
          {!isFilled ? (
            <Typography className="f14 bold mb-0" mb={1}>
              Traveller {totalPass}
            </Typography>
          ) : (
            ""
          )}
          <Typography className="f14 bold mb-0" mb={1}>
            {passName}
          </Typography>
          <Typography className="gray f12">{getdata.type}</Typography>
        </Box>
      </Box>
      <Box
        xs={3}
        p={0}
        m={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        
      >
        <Typography className=" f14 bold mb-0 basecolor1 cursor-pointer">
          {isFilled ? (
            "Change"
          ) : (
            "Add"
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default PassengersCard;
