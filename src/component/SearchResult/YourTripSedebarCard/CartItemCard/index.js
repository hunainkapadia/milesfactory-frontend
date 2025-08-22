import { Box, Typography, Avatar, Stack } from "@mui/material";
import {
  bookFlight,
  DeleteCart,
  closeDrawer,
  fetchflightDetail,
  setflightDetail,
  setOfferkeyforDetail,
  setOpenDrawer,
  setSelectedFlightKey,
  setSelectFlightKey,
  setSingleFlightData,
} from "@/src/store/slices/BookingflightSlice";

// import TripStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { currencySymbols } from "@/src/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  PassengerForm,
  setAllPassengerFill,
  setIsPassengerflow,
  setOrderUuid,
  setSeeDetailButton,
  setViewPassengers,
  ViewPassengers,
} from "@/src/store/slices/passengerDrawerSlice";
import { setMessage } from "@/src/store/slices/sendMessageSlice";
import { useEffect } from "react";

const CartItemCard = ({ index, getItems}) => {
    const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  const flightOrder = useSelector((state) => state?.payment?.OrderConfirm); //from order api
  const orderDetail = flightOrder?.order?.selected_offer;

  const AllPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );

  const validPassengers = GetViewPassengers?.filter(
    (p) => p.given_name && p.family_name
  );
  //   for selct flight detail
  const getselectedFlight = useSelector(
    (state) => state?.booking?.singleFlightData
  );
  const PaymentStatus = useSelector((state) => state?.payment?.paymentStatus);
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm); //from order api

  const dispatch = useDispatch();
  const offerkey = getselectedFlight?.id ?? null;

  console.log("getselectedFlight", getselectedFlight);
  

  const HandleSelectDrawer = () => {
    if (getselectedFlight?.id) {
      dispatch(setSeeDetailButton("Builder"));
      dispatch(setOpenDrawer(getselectedFlight.id));
      dispatch(setflightDetail(getselectedFlight));
    }
  };

  const handleClearFlight = () => {
    
  };


   console.log("getItems_getItems", getItems);
   const threaduuid = useSelector((state) => state?.sendMessage?.threadUuid);
   const allPassengerFill = useSelector((state) => state?.passengerDrawer?.allPassengerFill);

   console.log("allPassenger_222", getItems);

   // useEffect(()=> {
   //    if (allPassengerFill) {
   //       dispatch(DeleteCart(threaduuid, getItems?.uuid))
   //    }
   // },[])

   console.log("uuid_555", threaduuid);
   
   
   const handleDeleteCart = ()=> {
      dispatch(DeleteCart(threaduuid, getItems?.uuid))
   }


  return (
    <>
      <Box className={`${TripStyles.flightOfferCard}`} mb={3}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} gap={2} alignItems={"center"}>
            {index === 0 ? (
              <Box display={"flex"}>
                <Typography className="f12 semibold">
                  Departing flight
                </Typography>
              </Box>
            ) : (
              <Box display={"flex"}>
                <Typography className="f12 semibold">Return flight</Typography>
              </Box>
            )}
            <FontAwesomeIcon
              className="basecolor1-50"
              cursor="pointer"
              onClick={handleDeleteCart}
              icon={faClose}
              fontSize={20}
            />
          </Box>
          {PaymentStatus?.is_complete === "yes" &&
          PaymentStatus?.status === "success" ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              className={TripStyles.BookedLabel + " chip chipPrimary sm"}
            >
              Booked
            </Box>
          ) : getselectedFlight ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={TripStyles.SelectedLabel + " chip chipYellow sm"}
            >
              Selected
            </Box>
          ) : null}
        </Box>

        <Box
          component={"section"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            key={index}
            className={`${TripStyles.logoCol}`}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <Avatar
              src={slice?.segments[0]?.marketing_carrier?.logo_symbol_url}
              alt={slice?.segments[0]?.marketing_carrier?.name}
              className={TripStyles.airlineLogo}
            />
            <Box>
              <Typography lineHeight={1} className="f14 mb-0 bold black ">
                {slice?.segments[0]?.marketing_carrier?.name}
              </Typography>
              <Typography
                textTransform={"capitalize"}
                className="f12 mb-0 bold gray "
              >
                {slice?.segments[0]?.passengers[0]?.cabin_class}
              </Typography>
            </Box>
          </Box>
          <Box style={{ cursor: "pointer" }}>
            <Box
              onClick={HandleSelectDrawer}
              className="text-decoration-none cursor-pointer"
            >
              <Box
                gap={"4px"}
                alignItems={"center"}
                display={"flex"}
                className=" basecolor1 semibold f12"
              >
                <span>See details</span>
                <i className="fa-angle-right fa fas"></i>{" "}
              </Box>
            </Box>
          </Box>
        </Box>
        {/*  */}

        {/*  */}
        <Box
          className={TripStyles.fromAndToRow}
          key={index}
          display="flex"
          alignItems="center"
          gap={2}
        >
          {/* Airline Logo */}

          {/* Flight Details */}
          <Box className={`${TripStyles.FlightTimingsCol} w-100`}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2} // Optional spacing
            >
              {/* Departure Time & Code */}
              <Box className={TripStyles.Timings}>
                <Typography className={TripStyles.flightTime}>
                  {new Date(slice.departing_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Typography>
                <Typography className={TripStyles.flightRoute + " f12"}>
                  {slice.origin.iata_code}
                </Typography>
              </Box>

              {/* Flight Duration with Dotted Line */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                flex={1}
                className={TripStyles.flightDurationBox}
              >
                <Box className={TripStyles.divider}>
                  <img
                    src={
                      slice.segments?.length === 1
                        ? "/images/direct-plan-icon.svg"
                        : "/images/stop-plan-icon.svg"
                    }
                  />
                </Box>
                <Typography className={" gray f12"}>
                  {slice.duration}
                </Typography>
                {/* Dotted Line */}
              </Box>

              {/* Arrival Time & Code */}
              <Box textAlign={"right"} className={TripStyles.Timings}>
                <Typography className={TripStyles.flightTime}>
                  {new Date(slice.arriving_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Typography>
                <Typography className={TripStyles.flightRoute + " f12"}>
                  {slice.destination.iata_code}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* traveller and baggage */}
        <Box>
          {validPassengers?.length ? (
            <Stack
              direction="row"
              alignItems="center"
              component="section"
              justifyContent={"space-between"}
              mb={"8px"}
            >
              <Stack direction="row" spacing={"4px"} alignItems={"center"}>
                <Box pt={"3px"}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1.425C6.87 1.425 7.575 2.13 7.575 3C7.575 3.87 6.87 4.575 6 4.575C5.13 4.575 4.425 3.87 4.425 3C4.425 2.13 5.13 1.425 6 1.425ZM6 8.175C8.2275 8.175 10.575 9.27 10.575 9.75V10.575H1.425V9.75C1.425 9.27 3.7725 8.175 6 8.175ZM6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0ZM6 6.75C3.9975 6.75 0 7.755 0 9.75V12H12V9.75C12 7.755 8.0025 6.75 6 6.75Z"
                      fill="black"
                      fill-opacity="0.3"
                    />
                  </svg>
                </Box>
                <Box className="f12 basecolor">
                  <Typography component={"span"} className="f12 bold basecolor">
                    Travellers:{" "}
                  </Typography>
                  <Typography component={"span"} className="f12 gray">
                    {validPassengers?.map((p, i) => {
                      const isLast = i === validPassengers.length - 1;
                      return (
                        <span key={i}>
                          {p.given_name} {p.family_name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          ) : null}

          <Stack
            direction="row"
            spacing={"4px"}
            alignItems="center"
            component="section"
            justifyContent={"space-between"}
          >
            <Stack direction="row" spacing={"4px"} alignItems={"center"}>
              <Box pt={"3px"}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.75 2.75V1.5H5.25V2.75H7.75ZM1.5 4V10.875H11.5V4H1.5ZM11.5 2.75C12.1937 2.75 12.75 3.30625 12.75 4V10.875C12.75 11.5688 12.1937 12.125 11.5 12.125H1.5C0.80625 12.125 0.25 11.5688 0.25 10.875L0.25625 4C0.25625 3.30625 0.80625 2.75 1.5 2.75H4V1.5C4 0.80625 4.55625 0.25 5.25 0.25H7.75C8.44375 0.25 9 0.80625 9 1.5V2.75H11.5Z"
                    fill="black"
                    fillOpacity="0.3"
                  />
                </svg>
              </Box>

              <Stack width={"100%"}>
                <Typography className="f12 basecolor">
                  <Typography component={"span"} className="f12 bold basecolor">
                    Extra baggage:{" "}
                  </Typography>
                  {(() => {
                    const baggageMap = new Map();

                    getselectedFlight?.slices.forEach((slice) => {
                      slice?.segments?.forEach((segment) => {
                        segment?.passengers?.forEach((passenger) => {
                          passenger?.baggages?.forEach((baggage) => {
                            const key = `${baggage.type}-${baggage.formatted_type}`;
                            if (!baggageMap.has(key)) {
                              baggageMap.set(key, {
                                ...baggage,
                              });
                            }
                          });
                        });
                      });
                    });

                    const uniqueBaggages = Array.from(baggageMap.values());

                    return getselectedFlight?.slices.map(
                      (slice, sliceIndex) => {
                        const baggageSummary = uniqueBaggages
                          .filter((baggage) => baggage.quantity > 0)
                          .map(
                            (baggage) =>
                              `${baggage.quantity}x ${baggage.formatted_type}`
                          )
                          .join(", ");

                        return (
                          <span key={sliceIndex}>
                            {baggageSummary || "No baggage info"}
                            {sliceIndex === 0 &&
                            getselectedFlight?.slices.length > 1
                              ? " / "
                              : ""}
                          </span>
                        );
                      }
                    );
                  })()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {!validPassengers?.length && (
          <>
            <Box
              component={"section"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Box
                border={1}
                borderColor="rgba(197, 218, 222, 0.5)"
                component={"section"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
                className="white-bg br-100 "
                px={"14px"}
                py={"10px"}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11.75C8.2125 11.75 8.39063 11.6781 8.53438 11.5344C8.67813 11.3906 8.75 11.2125 8.75 11C8.75 10.7875 8.67813 10.6094 8.53438 10.4656C8.39063 10.3219 8.2125 10.25 8 10.25C7.7875 10.25 7.60938 10.3219 7.46563 10.4656C7.32188 10.6094 7.25 10.7875 7.25 11C7.25 11.2125 7.32188 11.3906 7.46563 11.5344C7.60938 11.6781 7.7875 11.75 8 11.75ZM7.25 8.75H8.75V4.25H7.25V8.75ZM8 15.5C6.9625 15.5 5.9875 15.3031 5.075 14.9094C4.1625 14.5156 3.36875 13.9813 2.69375 13.3063C2.01875 12.6313 1.48438 11.8375 1.09063 10.925C0.696875 10.0125 0.5 9.0375 0.5 8C0.5 6.9625 0.696875 5.9875 1.09063 5.075C1.48438 4.1625 2.01875 3.36875 2.69375 2.69375C3.36875 2.01875 4.1625 1.48438 5.075 1.09063C5.9875 0.696875 6.9625 0.5 8 0.5C9.0375 0.5 10.0125 0.696875 10.925 1.09063C11.8375 1.48438 12.6313 2.01875 13.3063 2.69375C13.9813 3.36875 14.5156 4.1625 14.9094 5.075C15.3031 5.9875 15.5 6.9625 15.5 8C15.5 9.0375 15.3031 10.0125 14.9094 10.925C14.5156 11.8375 13.9813 12.6313 13.3063 13.3063C12.6313 13.9813 11.8375 14.5156 10.925 14.9094C10.0125 15.3031 9.0375 15.5 8 15.5Z"
                    fill="#DEB135"
                    fill-opacity="0.7"
                  />
                </svg>
                <Typography component={"span"} className="f11 bold">
                  Add missing travellers
                </Typography>
              </Box>
            </Box>
          </>
        )}
        {/* {flightOrder ? (
          <>
            <Box
              mt={1}
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                className="black f12"
                gap={0.5}
              >
                <Typography component="span" className="bold">
                  {currencySymbols[orderDetail?.tax_currency] ||
                    orderDetail?.tax_currency}
                  {
                    flightOrder?.amount_calculations
                      ?.total_amount_plus_markup_and_all_services
                  }
                  ,{" paid"}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          ""
        )} */}

        {/*  */}
      </Box>
    </>
  );
};

export default CartItemCard;
