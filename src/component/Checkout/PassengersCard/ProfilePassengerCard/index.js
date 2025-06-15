import { Box, Card, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const ProfilePassengerCard = ({ ispassProfile, onClickPrifilePass }) => {
  console.log("ispassProfile", ispassProfile);
  
  return (
    <Box
      id={ispassProfile.uuid}
      onClick={onClickPrifilePass} // triggers drawer + setup logic
      className={`${styles.passengersCard}`}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box className="" display={"flex"} gap={2}>
        <Box className="imggroup">
          <img src="/images/user-circle.svg" />
        </Box>
        <Box p={0} m={0}>
          <Typography className="f14 bold mb-0" mb={1}>
            {ispassProfile?.given_name} {ispassProfile?.family_name}
          </Typography>
          <Typography
            textTransform={"capitalize"}
            className={" gray f12 capitalize-first-letter"}
          >
            {ispassProfile.type === "infant_without_seat"
              ? "Infants"
              : ispassProfile.type === "child"
              ? "Child"
              : ispassProfile.type === "adult"
              ? "Adult"
              : ispassProfile.type}
          </Typography>
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
        <Typography className=" f12 bold mb-0 basecolor1 cursor-pointer">
          Add
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePassengerCard;