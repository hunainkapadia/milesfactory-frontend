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
           <Box className="1111" sx={{ px: { xs: 0, lg: 2 } }}>
             <Box
               display={"flex"}
               alignItems={"center"}
               justifyContent={"center"}
               gap={"6px"}
               mb={"6px"}
             >
               <Typography
                 component={"h1"}
                 mb={0}
                 sx={{
                   lineHeight: "120%",
                   fontSize: { lg: "48px", md: "48px", xs: "36px" },
                 }}
                 className=" exbold test-5.1"
               >
                 Travel, crafted
               </Typography>

               <Box
                 className="imggroup"
                 sx={{ display: { lg: "block", md:"block", xs: "none" } }}
               >
                 <img
                   alt="Travel, crafted"
                   src="/images/dallar-craft-icon.svg"
                 />
               </Box>
             </Box>
             <Typography
               sx={{ display: { lg: "block", md: "block", xs: "none" } }}
               color="white"
             >
               Real direct prices and perfectly synced plans. Verified by Mylz
               AI across top platforms.
             </Typography>
             <Typography
               sx={{ display: { lg: "none", md: "none", xs: "block" } }}
               color="white"
             >
               Real direct prices and perfectly synced plans.
             </Typography>
           </Box>
         </Box>
       </Box>
     </Container>
   );
}

export default HerosectionContent;