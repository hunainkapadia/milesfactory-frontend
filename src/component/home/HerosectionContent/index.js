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
               No more juggling tabs or comparing markups. Mylz cuts through the
               chaos to find the fastest trips across flights, trains, and more
               at direct prices. Built for speed.
             </Typography>
           </Box>
         </Box>
       </Box>
     </Container>
   );
}

export default HerosectionContent;