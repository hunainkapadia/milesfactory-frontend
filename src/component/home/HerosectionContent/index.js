import { Box, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
const HerosectionContent = () => {
   return (
     <Container>
       <Box className={styles.Content}>
         <Box
           className={`${styles.ContentIn} ${styles.ContentInSection1}`}
           textAlign={"center"}
           display={"flex"}
           justifyContent={"center"}
           flexDirection={"column"}
         >
           <Box className="1111"
             sx={{ px: { xs: 0, lg: 2 } }}
           >
             <h1 className="h1-lg test-444">
               Stop the endless tabs.
               <br />
               Book trips in seconds.
             </h1>
             <Typography
               sx={{ display: { lg: "block", md: "block", xs: "none" } }}
               color="white"
               
             >
               Mylz AI finds the cheapest flight prices with full airline protection.
             </Typography>
             <Typography
               sx={{ display: { lg: "none", md: "none", xs: "block" } }}
               color="white"
             >
               Mylz AI finds you the cheapest flight<br/>prices with full airline protection.
             </Typography>
           </Box>
         </Box>
       </Box>
     </Container>
   );
}

export default HerosectionContent;