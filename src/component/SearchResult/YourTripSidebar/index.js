import {
  Box,
  Button,
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
import { currencySymbols } from "@/src/utils/utils";
import ShareDropdown from "../../layout/Header/ShareDropdown";

const YourTripSidebar = ({ isMessage }) => {
  const getselectedFlight = useSelector(
    (state) => state?.booking?.singleFlightData
  );
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm); //from order api
  console.log("orderSuccess", orderSuccess);
  


  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  const getSearchUrl = useSelector((state) => state?.sendMessage?.AllOfferUrl);
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder);

  return (
    <>
      {getBuilder && (
        <Box
          className={YourtripStyles.YourTripSidebar}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            className={YourtripStyles.YourTripCard}
            p={0}
          >
            <Box
              component={"header"}
              className={YourtripStyles.CardHeader}
              display={"flex"}
              alignItems={"center"}
              position={"relative"}
              zIndex={1}
              justifyContent={"space-between"}
              px={"18px"}
              pt={"20px"}
              pb={"13px"}
            >
              <Box gap={"3px"} display={"flex"} alignItems={"center"}>
                <Box className=" imggroup">
                  <img src="/images/builder-icon.svg" />
                </Box>
                
                <Typography sx={{pt:"6px"}} className="basecolor1 mb-0 exbold">
                  Builder
                </Typography>
              </Box>

              {/* <Box
                display={"flex"}
                alignItems={"center"}
                className="basecolor1"
                gap={1}
              >
                <Box className=" imggroup">
                  <Image width={24} height={24} src="/images/share-icon.svg" />
                </Box>
                <Typography className="bold">Share</Typography>
              </Box> */}
              {isMessage && <ShareDropdown />}
            </Box>
            <YourTripSedebarCard
              isSidebar
              offerData={getselectedFlight}
              getBuilder={getBuilder}
            />

            <Box
              px={"18px"}
              py={"14px"}
              component={"footer"}
              className={YourtripStyles.Footer + " "}
              sx={{ borderTop:" solid 1px  #E6EEEE" }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box>
                  <h4 className="exbold mb-0">
                    {getselectedFlight?.per_passenger_amount != null
                      ? (currencySymbols[getselectedFlight?.tax_currency] ||
                          getselectedFlight?.tax_currency) +
                        Math.round(getselectedFlight?.per_passenger_amount)
                      : "-"}
                  </h4>

                  <Typography className="gray f12">
                    {getselectedFlight?.total_amount != null
                      ? (currencySymbols[getselectedFlight?.tax_currency] ||
                          getselectedFlight?.tax_currency) +
                        Math.round(getselectedFlight?.total_amount) +
                        " total"
                      : "No product added"}
                  </Typography>
                </Box>
                
                <Button
                  className={`btn btn-primary btn-round btn-xs ${
                    !!orderSuccess || !getselectedFlight ? "disabled" : ""
                  }`}
                    
                  // onClick={HandleSelectDrawer}
                >
                  Book now
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default YourTripSidebar;
