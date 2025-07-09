import { Box, Card, Typography } from "@mui/material";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";

const PassengerProfileTab = ({
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
      className={`${Profilestyles.inactiveTab} 
  ${isFilled ? Profilestyles.isFilled + " isFilled" : Profilestyles.Notactive}
  ${!onClickCard ? Profilestyles.disabledCard : ""}
  ${isActive ? Profilestyles.activeTab + " activeTab" : ""}`} // ✅ Add active class
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box className="" display={"flex"} gap={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src="/images/card-icon.svg"
            alt="Traveler icon"
            style={{ width: 16, height: 16 }}
          />
          
            {!isFilled ? (
               <>
                  <Typography className="basecolor-dark f12">
                  Traveller {totalPass}{" "}
                  {getdata.type === "infant_without_seat" ? (
                     <>
                        {" "}(Infants){" "}
                     </>
                  ) : getdata.type === "child" ? (
                     <>
                        {" "}(Child){" "}
                     </>
                  ) : getdata.type === "adult" ? (
                     <>
                        {" "}(Adult){" "}
                        
                     </>
                  ) : (
                     getdata.type
                  )}
                  </Typography>
                  
               </>
            ) : (
               <>
                  <Typography className="basecolor-dark f12">
                  {getdata?.given_name} {getdata?.family_name}
                  
                  
                  {getdata.type === "infant_without_seat" ? (
                     <>
                        {" "}(Infants){" "}
                     </>
                  ) : getdata.type === "child" ? (
                     <>
                        {" "}(Child){" "}
                     </>
                  ) : getdata.type === "adult" ? (
                     " (Adult)"
                  ) : (
                     getdata.type
                  )}
                  </Typography>
               </>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default PassengerProfileTab;
