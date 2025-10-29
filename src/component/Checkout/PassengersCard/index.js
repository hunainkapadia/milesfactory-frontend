import { Box, Card, Stack, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
      <Box display={"flex"} gap={2}>
        <Box className="imggroup">
          <img src="/images/user-circle.svg" />
        </Box>
        <Stack p={0} m={0} justifyContent={"center"}>
          {!isFilled ? (
            <>
              <Typography className="f14 bold mb-0" mb={1}>
                Traveller {totalPass}
              </Typography>
              <Typography className={" gray f12 "}>
                {getdata.type === "infant_without_seat" ? (
                  <>
                    Infants{" "}
                    <Typography
                      className="f12 red"
                      component="span"
                      display="inline"
                    >
                      {getdata?.age}
                    </Typography>{" "}
                    year
                  </>
                ) : getdata.type === "child" ? (
                  <>
                    Child{" "}
                    <Typography
                      className="f12 red"
                      component="span"
                      display="inline"
                    >
                      {getdata?.age}
                    </Typography>{" "}
                    year
                  </>
                ) : getdata.type === "adult" ? (
                  <>
                    Adult{" "}
                    <Typography
                      className="f12"
                      component="span"
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
              <Typography className="f14 bold mb-0 capitalize"  mb={1}>
                {getdata?.given_name} {getdata?.family_name}
              </Typography>
              <Typography className={" gray f12 "}>
                {getdata.type === "infant_without_seat" ? (
                  <>
                    Infants{" "}
                    <Typography
                      className="f12 red"
                      component="span"
                      display="inline"
                    >
                      {getdata?.age}
                    </Typography>{" "}
                    year
                  </>
                ) : getdata.type === "child" ? (
                  <>
                    Child{" "}
                    <Typography
                      className="f12 red"
                      component="span"
                      display="inline"
                    >
                      {getdata?.age}
                    </Typography>{" "}
                    year
                  </>
                ) : getdata.type === "adult" ? (
                  "Adult"
                ) : (
                  getdata.type
                )}
              </Typography>
            </>
          )}
        </Stack>
      </Box>
      <Box
        xs={3}
        p={0}
        m={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        className={"basecolor1"}
        gap={"5px"}
      >
        <Typography whiteSpace={"nowrap"} className=" f12 bold mb-0 basecolor1 cursor-pointer" >
          {isFilled ? "Change" : "Add"}
        </Typography>
        <FontAwesomeIcon icon={faAngleRight} fontSize={"14px"}/>
      </Box>
    </Box>
  );
};

export default PassengersCard;
