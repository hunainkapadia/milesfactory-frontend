// components/TripCard.js
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import styles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTripDetailData, TripDetailSlice } from "@/src/store/slices/Base/baseSlice";
import { useRouter } from "next/router";

const TripCard = ({ tripData }) => {
  const offer = tripData.selected_offer;
  const slice = offer?.slices[0];
  const segment = slice?.segments[0];

  const origin = segment?.origin?.iata_code;
  const destination = segment?.destination?.iata_code;
  const departure = segment?.departing_at;
  const arrival = segment?.arriving_at;

  const route = `${origin} - ${destination}`;
  const date = `${new Date(departure).toDateString()} - ${new Date(
    arrival
  ).toDateString()}`;
  const passengers = `${offer?.passengers?.length} passenger${
    offer.passengers.length > 1 ? "s" : ""
  }`;
  const description = `You're all set to fly with ${offer?.owner?.name}. Departure from ${segment?.origin?.name} to ${segment?.destination?.name}.`;

  const logo = offer?.owner?.logo_symbol_url || "/default-airline-logo.png";

  const dispatch = useDispatch();
const router = useRouter(); // initialize router

const TripDetailHandle = (uuid) => {
  console.log("tripuuid", uuid);
  dispatch(TripDetailSlice(uuid));      // fetch detail
  router.push(`/my-trips/${uuid}`);     // open the slug page
};
  

  const TripDetail = useSelector((state) => state?.base?.TripDetailData?.order);
  

  console.log("TripDetail", offer?.slice);
  

  return (
    <Card className={styles.tripCard} sx={{ p: 0 }} variant="outlined">
      <Box display={"flex"} gap={"15px"} flexDirection={"column"}>
        {/* Status and Share */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            px={2}
            py={0.5}
            sx={{
              backgroundColor: "#D9F1E9",
              color: "#005742",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            {tripData.order_status === "confirmed" ? "Confirmed" : "Pending"}
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={0.5}>
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 15.5C10.625 15.5 10.0938 15.2813 9.65625 14.8438C9.21875 14.4063 9 13.875 9 13.25C9 13.175 9.01875 13 9.05625 12.725L3.7875 9.65C3.5875 9.8375 3.35625 9.98438 3.09375 10.0906C2.83125 10.1969 2.55 10.25 2.25 10.25C1.625 10.25 1.09375 10.0312 0.65625 9.59375C0.21875 9.15625 0 8.625 0 8C0 7.375 0.21875 6.84375 0.65625 6.40625C1.09375 5.96875 1.625 5.75 2.25 5.75C2.55 5.75 2.83125 5.80313 3.09375 5.90938C3.35625 6.01562 3.5875 6.1625 3.7875 6.35L9.05625 3.275C9.03125 3.1875 9.01562 3.10313 9.00938 3.02188C9.00313 2.94063 9 2.85 9 2.75C9 2.125 9.21875 1.59375 9.65625 1.15625C10.0938 0.71875 10.625 0.5 11.25 0.5C11.875 0.5 12.4063 0.71875 12.8438 1.15625C13.2813 1.59375 13.5 2.125 13.5 2.75C13.5 3.375 13.2813 3.90625 12.8438 4.34375C12.4063 4.78125 11.875 5 11.25 5C10.95 5 10.6688 4.94688 10.4062 4.84063C10.1438 4.73438 9.9125 4.5875 9.7125 4.4L4.44375 7.475C4.46875 7.5625 4.48438 7.64688 4.49063 7.72813C4.49688 7.80938 4.5 7.9 4.5 8C4.5 8.1 4.49688 8.19063 4.49063 8.27188C4.48438 8.35313 4.46875 8.4375 4.44375 8.525L9.7125 11.6C9.9125 11.4125 10.1438 11.2656 10.4062 11.1594C10.6688 11.0531 10.95 11 11.25 11C11.875 11 12.4063 11.2188 12.8438 11.6562C13.2813 12.0938 13.5 12.625 13.5 13.25C13.5 13.875 13.2813 14.4063 12.8438 14.8438C12.4063 15.2813 11.875 15.5 11.25 15.5ZM11.25 14C11.4625 14 11.6406 13.9281 11.7844 13.7844C11.9281 13.6406 12 13.4625 12 13.25C12 13.0375 11.9281 12.8594 11.7844 12.7156C11.6406 12.5719 11.4625 12.5 11.25 12.5C11.0375 12.5 10.8594 12.5719 10.7156 12.7156C10.5719 12.8594 10.5 13.0375 10.5 13.25C10.5 13.4625 10.5719 13.6406 10.7156 13.7844C10.8594 13.9281 11.0375 14 11.25 14ZM2.25 8.75C2.4625 8.75 2.64062 8.67813 2.78438 8.53438C2.92813 8.39063 3 8.2125 3 8C3 7.7875 2.92813 7.60938 2.78438 7.46563C2.64062 7.32188 2.4625 7.25 2.25 7.25C2.0375 7.25 1.85938 7.32188 1.71563 7.46563C1.57188 7.60938 1.5 7.7875 1.5 8C1.5 8.2125 1.57188 8.39063 1.71563 8.53438C1.85938 8.67813 2.0375 8.75 2.25 8.75ZM11.25 3.5C11.4625 3.5 11.6406 3.42813 11.7844 3.28438C11.9281 3.14062 12 2.9625 12 2.75C12 2.5375 11.9281 2.35938 11.7844 2.21563C11.6406 2.07188 11.4625 2 11.25 2C11.0375 2 10.8594 2.07188 10.7156 2.21563C10.5719 2.35938 10.5 2.5375 10.5 2.75C10.5 2.9625 10.5719 3.14062 10.7156 3.28438C10.8594 3.42813 11.0375 3.5 11.25 3.5Z"
                fill="#00C4CC"
              />
            </svg>
            <Typography
              variant="body2"
              className="basecolor1"
              sx={{ cursor: "pointer" }}
            >
              Share this trip
            </Typography>
          </Box>
        </Box>

        {/* Route & Dates */}
        
        <Box>
          <Typography fontWeight="bold">{route}</Typography>
          <Typography className="f12" fontWeight="bold">
            {date} | {passengers}
          </Typography>
        </Box>

        {/* Airline Logo */}
        <Box
          display={"flex"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            src={logo}
            alt="Airline"
            width={100}
            height={25}
            style={{ borderRadius: 8, objectFit: "contain" }}
          />
        </Box>

        {/* Description */}
        <Typography variant="body2" className="f10" gutterBottom>
          {description}
        </Typography>

        {/* Actions */}
        <Box display="flex" gap={1} justifyContent="center">
          <Button onClick={()=>TripDetailHandle(tripData?.uuid)}
            className="btn btn-primary btn-round btn-sm btn-border basecolor1 f11"
            sx={{ width: "100%" }}
          >
            View trip
          </Button>
          {/* <Button
            className="btn btn-primary btn-round btn-sm btn-border basecolor1 f11"
            sx={{ width: "100%", whiteSpace:"nowrap" }}
          >
            Add to this trip
          </Button> */}
        </Box>
      </Box>
    </Card>
  );
};

export default TripCard;
