import { Box, Card, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import dayjs from "dayjs";

const PassengersCard = ({
  passName,
  getdata,
  totalPass,
  isMainPassenger,
  isActive,
  onToggle,
  isFilled,
  onClickCard,
  passDetail,
}) => {
  console.log("pass_getdata", getdata?.age);
  const birthDate = dayjs(getdata.born_on);
  const now = dayjs();

  const years = now.diff(birthDate, "year");
  const months = now.diff(birthDate.add(years, "year"), "month");

  return (
    <Box
      id={getdata.uuid}
      onClick={onClickCard} // triggers drawer + setup logic
      className={`${styles.passengersCard} 
        ${isFilled ? styles.isFilled + " isFilled" : styles.Notactive}
        ${!onClickCard ? styles.disabledCard : ""}`}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box className="" display={"flex"} gap={2}>
        <Box className="imggroup">
          <img src="/images/user-circle.svg" />
        </Box>
        <Box p={0} m={0}>
          {!isFilled ? (
            <>
              <Typography className="f14 bold mb-0" mb={1}>
                Traveller {totalPass}
              </Typography>
              <Typography
                
                className={"gray f12 "}
              >
                {getdata.type === "infant_without_seat" ? (
                  <>
                    Infants{" "}
                    <Typography
                      component="span"
                      className="f12 red"
                      display="inline"
                    >
                      {years} year{years !== 1 ? "s" : ""}
                      {months > 0
                        ? ` ${months} month${months !== 1 ? "s" : ""}`
                        : ""}
                    </Typography>
                  </>
                ) : getdata.type === "child" ? (
                  <>
                    Child{" "}
                    <Typography
                      component="span"
                      className="f12 red"
                      display="inline"
                    >
                      {years} year{years !== 1 ? "s" : ""}
                      {months > 0
                        ? ` ${months} month${months !== 1 ? "s" : ""}`
                        : ""}
                    </Typography>
                  </>
                ) : getdata.type === "adult" ? (
                  <>
                    Adult{" "}
                    <Typography
                      component="span"
                      className="f12 red"
                      display="inline"
                    >
                      18 years and older
                    </Typography>
                  </>
                ) : (
                  getdata.type
                )}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                className="f14 bold mb-0"
                mb={1}
                textTransform={"capitalize"}
              >
                {getdata?.given_name} {getdata?.family_name}
              </Typography>
              <Typography
                textTransform={"capitalize"}
                className={" gray f12 capitalize-first-letter"}
              >
                {getdata.type === "infant_without_seat"
                  ? "Infants"
                  : getdata.type === "child"
                  ? "Child"
                  : getdata.type === "adult"
                  ? "Adult"
                  : getdata.type}
              </Typography>
            </>
          )}
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
          {isFilled ? "Change" : "Add"}
        </Typography>
      </Box>
    </Box>
  );
};

export default PassengersCard;
