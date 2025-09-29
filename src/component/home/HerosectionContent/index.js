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
           
             <Typography component={"h1"}  sx={{lineHeight:"120%", display: { lg: "block", md: "block", xs: "none" }, mb:"6px", fontSize:{lg:"48px", md:"48px", xs:"36px"} }} className=" bold test-222">
               Design trips. Book instantly.
             </Typography>
             <Typography  component={"h1"} sx={{lineHeight:"120%", display: { lg: "none", md: "none", xs: "block" }, mb:"6px", fontSize:{lg:"48px", md:"48px", xs:"36px"} }} className=" bold  test-444">
               Design trips.<br />Book instantly.
             </Typography>
             <Typography
               sx={{ display: { lg: "block", md: "block", xs: "none" } }}
               color="white"
               
             >
               Set your budget, time, and pace – Mylz AI builds real travel plans you can book.
             </Typography>
             <Typography
               sx={{ display: { lg: "none", md: "none", xs: "block" } }}
               color="white"
             >
               Mylz builds real travel plans you can book.
             </Typography>
           </Box>
         </Box>
       </Box>
     </Container>
   );
}

export default HerosectionContent;