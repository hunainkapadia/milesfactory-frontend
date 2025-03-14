import { Card, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const PassengersCard = ({ getdata, totalPass, isMainPassenger, isActive, onToggle }) => {
  return (
    <Card
      id={getdata.uuid}
      onClick={() => onToggle(getdata.uuid)} // Pass the UUID to toggle selection
      className={`${styles.passengersCard} ${isActive ? styles.Active : styles.Notactive}`}
      sx={{ padding: 2, borderRadius: 2, cursor: "pointer" }}
    >
      <Typography className="mb-10" mb={1} variant="h6">
        {isMainPassenger ? "Main Passenger" : "Passenger"}
      </Typography>
      <Typography className="gray">
        {getdata.type} {" "} {totalPass}
      </Typography>
    </Card>
  );
};

export default PassengersCard;
