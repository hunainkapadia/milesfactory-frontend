import { Box, Card, Typography } from "@mui/material";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";

const PassengerProfileTab = ({
  getdata,
  totalPass,

  isFilled,
  onClickCard,
  passDetail,
}) => {
  return (
    <Box className={Profilestyles.TabBox}
      id={getdata.uuid}
      display="flex"
      alignItems="center"
      gap={1}
      justifyContent={"flex-start"}
    >
      <img
        src="/images/card-icon.svg"
        alt="Traveler icon"
        style={{ width: 16, height: 16 }}
      />

      {!isFilled ? (
        <>
          <Typography className="basecolor-dark f12" mt={"2px"}>
            Traveller {totalPass}{" "}
            {getdata.type === "infant_without_seat" ? (
              <> (Infants) </>
            ) : getdata.type === "child" ? (
              <> (Child) </>
            ) : getdata.type === "adult" ? (
              <> (Adult) </>
            ) : (
              getdata.type
            )}
          </Typography>
        </>
      ) : (
        <>
          <Typography className="basecolor-dark f12" mt={"2px"}>
            {getdata?.given_name} {getdata?.family_name}
            {getdata.type === "infant_without_seat" ? (
              <> (Infants) </>
            ) : getdata.type === "child" ? (
              <> (Child) </>
            ) : getdata.type === "adult" ? (
              " (Adult)"
            ) : (
              getdata.type
            )}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PassengerProfileTab;
