import Header from "@/src/component/layout/Header";
import TripCard from "@/src/component/TripCard";
import { MyTripSlice } from "@/src/store/slices/Base/baseSlice";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import { setisUserPopup } from "@/src/store/slices/Auth/SignupSlice";
import { createThread, createThreadAndRedirect } from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";

const MyTrips = () => {
   const dispatch = useDispatch();
   
   useEffect(() => {
     dispatch(MyTripSlice());
   }, [0]);
   
   const isLoading = useSelector((state) => state?.base);
   const TripData = useSelector((state) => state?.base?.TripData);

   const UPcommingTrip = TripData?.upcoming_trips ?? [];
   const pastTrips = TripData?.past_trips ?? [];

   console.log("TripData", TripData);
   
   // book trip 
   // currentUser ? HandleBookThread : HandlePopup}
   useEffect(() => {
       dispatch(createThread());
     }, [dispatch]);
   const router = useRouter();
   const HandlePopup = () => {
     dispatch(setisUserPopup(true));
   };
   const HandleBookThread = () => {
     dispatch(createThreadAndRedirect(router));
   };
   
   const currentUser = useSelector((state) => state.base?.currentUser);
   
   
   return (
     <Box component={"main"} className={styles.TripBody + " main-body "}>
       <Header isMessage={"isMessage"} isChat={"isChat"} />
       <Box component={"section"} sx={{py:{lg:"83px", md: "83px", xs:"33px"}}}>
         <Container>
           <Box
             component={"section"}
             display="flex"
             justifyContent="space-between"
             alignItems="center"
             mb={2}
           >
             <Box display="flex" gap={2} alignItems="center">
               <Box
                 display="flex"
                 alignItems="center"
                 height={24}
                 // Optional
                 className={" imggroup"}
                 onClick={"handleThreadDrawer"}
               >
                 <img
                   width={24}
                   src={`/images/book-trip-icon.svg`}
                   alt="book trip"
                 />
               </Box>
               <h3 className="mb-0">My booked trips</h3>
             </Box>

             <Button 
               onClick={currentUser ? HandleBookThread : HandlePopup}
               sx={{ display: { lg: "block", md: "block", xs: "none" } }}
               className="btn btn-primary btn-round btn-primary btn-sm"
             >
               Book a new trip
             </Button>
           </Box>
           <Box>
             <hr />
           </Box>

           <Grid container spacing={1}>
             {UPcommingTrip.length > 0 ? (
               UPcommingTrip.map((trip, index) => (
                 <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                   <TripCard tripData={trip} />
                 </Grid>
               ))
             ) : (
               <Typography variant="body2">No upcoming trips found.</Typography>
             )}
           </Grid>
         </Container>
       </Box>
     </Box>
   );
}

export default MyTrips;