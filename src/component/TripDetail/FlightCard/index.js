import { TripDetailSlice } from "@/src/store/slices/Base/baseSlice";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import tripStyles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";

import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Divider,
  Grid,
  capitalize,
} from "@mui/material";
import Header from "../../layout/Header";
import FromAndToDetail from "../../Checkout/BookingDrawer/FromAndToDetail";
import { currencySymbols } from "@/src/utils/utils";

const FlightCard = ({flightOffer, tripDetail}) => {
   const daysLeft = Math.ceil(
    (new Date(flightOffer?.slices[0]?.segments[0]?.departing_at) - new Date()) /
      (1000 * 60 * 60 * 24)
  );

   return (
      <>
         <Box component="main" className={styles.TripBody + " main-body "}>
                 <Header isMessage="isMessage" />
                 <Box sx={{ backgroundColor: "#e6f5ee" }} py={4}>
                   {/* Hero section */}
                   <Box
                     component={"header"}
                     pb={2}
                     sx={{
                       backgroundImage: "url('/plane-wing.jpg')", // put image in /public
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       color: "#fff",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       flexDirection: "column",
                       textAlign: "center",
                     }}
                   >
                     <Typography variant="h6" textTransform={"capitalize"}>
                  
                       Hi, {flightOffer?.passengers[0]?.given_name}{" "}
                       {flightOffer?.passengers[0]?.family_name}
                     </Typography>
                     <Typography variant="h3"  sx={{ textTransform: "capitalize" }}>
         
                       In {daysLeft} days,{" "}
                       {flightOffer?.slices[0]?.segments[0].destination?.city_name} is yours.
                     </Typography>
                   </Box>
                   {/* Trip Detail Card */}
                   <Container maxWidth="sm">
                     <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                       <Typography fontWeight={600} gutterBottom>
                         Everything is in order
                       </Typography>
                       <Typography variant="body2" gutterBottom>
                         There's nothing to do except waiting {daysLeft} days before
                         takeoff. Booking reference (PNR):{" "}
                         <span className="exbold">{flightOffer?.duffel_order?.booking_reference}</span>
                       </Typography>
                       <Divider sx={{ my: 2 }} />
                       {/* Flights */}
         
                       {/*  */}
         
                       <Box className={`${styles.checkoutDrower} aaaaa`}>
                         <Box
                           className={styles.checkoutDrower + " white-bg"}
                           width={480}
                         >
                           <Box
                             className={`${styles.checkoutDrowerSection} ${styles.MyTripDrowerSection} white-bg`}
                           >
                             <Box
                               component={"header"}
                               px={0}
                               display="flex"
                               justifyContent="space-between"
                               flexDirection={"column"}
                               gap={0}
                             >
                               <Box
                                 component={"section"}
                                 display="flex"
                                 justifyContent="space-between"
                                 alignItems={"center"}
                               ></Box>
                               <h3 className="regular mb-0">Flight details</h3>
                             </Box>
                             <Box className={styles.checkoutDrowerBody}>
                               {/* Header Section */}
                               <Box
                                 mb={3}
                                 display={"flex"}
                                 justifyContent={"space-between"}
                                 alignItems={"center"}
                               >
                                 <Box>
                                   <h4 className={styles.title + " mb-0"}>
                                     {flightOffer?.slices[0]?.origin.city_name} to{" "}
                                     {flightOffer?.slices[0]?.destination.city_name}
                                   </h4>
                                   <Typography className=" f14 bold">
                                     {flightOffer?.slices
                                       .slice(0, 2)
                                       .map((slice) =>
                                         new Date(slice.departing_at).toLocaleDateString(
                                           "en-GB",
                                           {
                                             day: "2-digit",
                                             month: "short",
                                           }
                                         )
                                       )
                                       .join(" - ")}
                                   </Typography>
         
                                   {flightOffer?.slices?.length <= 1 ? (
                                     <Typography className={"f14 gray"}>
                                       {"One way"},{" "}
                                       {
                                         flightOffer?.slices[0]?.segments[0]?.passengers[0]
                                           .cabin_class_marketing_name
                                       }
                                     </Typography>
                                   ) : (
                                     <Typography className={"f14 gray"}>
                                       {"Return"},{" "}
                                       {
                                         flightOffer?.slices[0]?.segments[0]?.passengers[0]
                                           .cabin_class_marketing_name
                                       }
                                     </Typography>
                                   )}
                                 </Box>
                               </Box>
         
                               <Box
                                 className={
                                   styles.detailsSection + " " + tripStyles.Tripdetail
                                 }
                                 py={0}
                                 px={0}
                               >
                                 <>
                                   {flightOffer?.slices.map((slice, index) => (
                                     <>
                                       <FromAndToDetail
                                         key={index} // Always add a unique key when mapping
                                         sliceLength={flightOffer?.slices.length}
                                         getdata={slice}
                                         logo={
                                           flightOffer?.slices[0]?.segments[0]
                                             ?.marketing_carrier?.logo_symbol_url
                                         }
                                         flightType={index === 0 ? "Outbound" : "Return"}
                                         // SearchHistoryGet={searchHistory}
                                       />
                                     </>
                                   ))}
                                   <Box
                                     display={"flex"}
                                     gap={2}
                                     alignItems={"center"}
                                     mb={3}
                                   >
                                     <img width={14} src="/images/leave-icon.svg" />
                                     <Typography
                                       className={styles.normalOption + " f12 gray"}
                                     >
                                       <span>
                                         Emissions estimate: {flightOffer?.total_emissions_kg}{" "}
                                         kg CO₂e
                                       </span>
                                     </Typography>
                                   </Box>
                                   <Box display={"flex"} gap={2} alignItems={"center"}>
                                     <Typography variant="p" className="gray f12" pb={2}>
                                       {flightOffer?.conditions?.change_before_departure
                                         ?.allowed === true &&
                                         flightOffer?.conditions?.change_before_departure
                                           ?.penalty_amount > 0 &&
                                         `You can change your flight before departure for ${
                                           flightOffer?.conditions?.change_before_departure
                                             ?.penalty_currency
                                         } ${" "} ${
                                           flightOffer?.conditions?.change_before_departure
                                             ?.penalty_amount
                                         }`}
         
                                       {flightOffer?.conditions?.change_before_departure
                                         ?.allowed === true &&
                                         flightOffer?.conditions?.change_before_departure
                                           ?.penalty_amount == 0 &&
                                         `You can change your flight before departure without any extra cost`}
                                     </Typography>
                                   </Box>
                                   <Box display={"flex"} gap={2} alignItems={"center"}>
                                     <Typography variant="p" className="gray f12" pb={2}>
                                       {flightOffer?.conditions?.refund_before_departure
                                         ?.allowed === true &&
                                         flightOffer?.conditions?.refund_before_departure
                                           ?.penalty_amount > 0 &&
                                         `You can refund your flight before departure for ${
                                           flightOffer?.conditions?.refund_before_departure
                                             ?.penalty_currency
                                         } ${" "} ${
                                           flightOffer?.conditions?.refund_before_departure
                                             ?.penalty_amount
                                         }`}
         
                                       {flightOffer?.conditions?.refund_before_departure
                                         ?.allowed === true &&
                                         flightOffer?.conditions?.refund_before_departure
                                           ?.penalty_amount == 0 &&
                                         `You can refund your flight before departure without any extra cost`}
                                     </Typography>
                                   </Box>
                                 </>
                               </Box>
                             </Box>
                           </Box>
                         </Box>
                         {/* Footer Section */}
                       </Box>
         
                       <Divider sx={{ my: 2 }} />
                       {/* Traveler */}
                       <Box mb={2}>
                         <Typography variant="subtitle2">Travelers</Typography>
                         <Typography>
                           {flightOffer?.passengers[0]?.given_name}{" "}
                           {flightOffer?.passengers[0]?.family_name} -{" "}
                           {flightOffer?.passengers[0]?.born_on
                               ? new Date(tripDetail.passengers[0].born_on).toLocaleDateString("en-GB", {
                                   day: "2-digit",
                                   month: "short",
                                   year: "numeric",
                                 })
                               : ""}
                         </Typography>
                       </Box>
                       {/* Payment Info */}
                       <Grid container spacing={2}>
                         <Grid item xs={12}>
                           <Typography variant="subtitle2">Payment info</Typography>
                           <Typography variant="body2">
                             Total cost:{" "}
                             {currencySymbols[tripDetail?.duffel_order?.total_currency]}
                             <strong>
                               {
                                 tripDetail?.amount_calculations
                                   ?.total_amount_plus_markup_and_all_services
                               }
                             </strong>{" "}
                           </Typography>
                         </Grid>
                         <Grid item xs={6}>
                           <Typography variant="subtitle2">Customer service</Typography>
                           <Typography fontSize="14px">
                             Booking reference: <span className="exbold">{flightOffer?.duffel_order?.booking_reference}</span>
                           </Typography>
                           <Typography fontSize="12px" color="primary" sx={{ mt: 0.5 }}>
                             <a href="mailto:hello@gomylz.com">
                               Send a message to customer service
                             </a>
                           </Typography>
                         </Grid>
                       </Grid>
                       {/* Cancellation section */}
                       {/* <Box mt={3} p={2} bgcolor="#f4f4f4" borderRadius={2}>
                         <Typography fontWeight="bold">
                           Cancellation without reason
                         </Typography>
                         <Button
                           className="btn btn-primary btn-border btn-sm  btn-rounded"
                           sx={{ mt: 1 }}
                         >
                           Cancel my booking
                         </Button>
                       </Box> */}
                       {/* Bottom buttons */}
                       {/* <Box display="flex" justifyContent="space-between" mt={3}>
                         <Button size="small" variant="outlined">
                           Cancel
                         </Button>
                         <Button size="small" variant="outlined">
                           Manage bags
                         </Button>
                         <Button size="small" variant="contained" color="success">
                           Update
                         </Button>
                       </Box> */}
                     </Paper>
                   </Container>
                 </Box>
               </Box>
      </>
   );
}

export default FlightCard;