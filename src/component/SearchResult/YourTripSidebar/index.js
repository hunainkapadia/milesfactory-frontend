import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import YourTripSedebarCard from "../YourTripSedebarCard";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import Image from "next/image";

const YourTripSidebar = ({ isMessage }) => {
  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );

  console.log("getselectedFlight", getselectedFlight)

  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  const getSearchUrl = useSelector((state) => state?.sendMessage?.AllOfferUrl);
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const getBuilder_22 = useSelector((state) => state?.sendMessage);
  console.log("getBuilder_000", getBuilder_22)

  return (
    <>
    {getBuilder && (
      <Box
        className={YourtripStyles.YourTripSidebar}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className={YourtripStyles.YourTripCard} p={0}>
          <Box
            component={"header"}
            className={YourtripStyles.CardHeader}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={3}
            pt={"20px"}
            pb={"13px"}
          >
            <Box gap={1} display={"flex"} alignItems={"center"}>
              <Box className=" imggroup">
                <img src="/images/large-screen-icon.svg" />
              </Box>
              <Box className=" imggroup">
                <img src="/images/builder-icon.svg" />
              </Box>
              <Typography className="basecolor1 mb-0 bold">Builder</Typography>
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              className="basecolor1"
              gap={1}
            >
              <Box className=" imggroup">
                <Image width={24} height={24} src="/images/share-icon.svg" />
              </Box>
              <Typography>Share</Typography>
            </Box>
          </Box>
            <YourTripSedebarCard
              offerData={getselectedFlight}
              getBuilder={getBuilder}
            />
          
        </Box>
      </Box>
          )}
    </>
  );
};

export default YourTripSidebar;
