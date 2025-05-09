import { Box, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
const HerosectionContent = () => {
   return (
     <Container>
       <Box className={styles.Content}>
         <Box
           className={styles.ContentIn}
           textAlign={"center"}
           display={"flex"}
           justifyContent={"center"}
           flexDirection={"column"}
         >
           <Box sx={{ px: { xs: 0, md: 2, lg: 2 } }}>
             <h1 className="h1-lg test-444">
                Stop the multi-tabs.
               <br />
               Book trips in seconds.
             </h1>
             <Typography color="white">
               Skip the markups and chaos. Mylz finds the smartest routes across
               flights, trains, and hotels - always at direct prices and with no
               hidden fees. Built for speed. Powered by AI.
             </Typography>
           </Box>
         </Box>
       </Box>
     </Container>
   );
}

export default HerosectionContent;