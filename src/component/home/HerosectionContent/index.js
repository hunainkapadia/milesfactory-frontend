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
           <Box sx={{ px: { xs: 0, md: 5, lg: 5 } }}>
             <h1 className="h1-lg test444">
               Travel smarter with<br/>AI-powered savings
             </h1>
             <Typography color="white">
               Find and book your perfect trip at the best price - effortlessly.
               Mylz has access to live prices and availability directly from all
               global airlines, hotels, and tour guides.
             </Typography>
           </Box>
         </Box>
       </Box>
     </Container>
   );
}

export default HerosectionContent;