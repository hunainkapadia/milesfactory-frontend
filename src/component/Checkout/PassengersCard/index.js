import { Card, Typography } from "@mui/material";

const PassengersCard = ({ getdata, totalPass, isMainPassenger }) => {
  console.log("getdata, totalPass", getdata, totalPass);

  return (
    <Card
      className="passengersCard "
      sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}
    >
      <Typography className="mb-10" mb={1} variant="h6">
      {isMainPassenger ? "Main Passenger" : "Passenger"}
      </Typography>
      <Typography className="gray">
        {getdata.type}
        {"  "}
        {totalPass}
      </Typography>
    </Card>
  );
};

export default PassengersCard;
