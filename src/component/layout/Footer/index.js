import { Box, Container } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss"
const Footer = () => {
   return (
     <>
       <footer className={styles.Footer}>
         <Container>
           <div className={styles.FooterBox + " d-flex justify-content-between"}>
             <Box
               display={"flex"}
               alignItems={"center"}
               gap={4}
               className=" no-list"
             >
               <div>
                 <Link className="basecolor" href={"/"}>© 2025 Milesfactory</Link>
               </div>
               <div>
                 <Link className="basecolor" href={"/"}>Privacy</Link>
               </div>
               <div>
                 <Link className="basecolor" href={"/"}>Cookies</Link>
               </div>
               <div>
                 <Link className="basecolor" href={"/"}>Accessibility</Link>
               </div>
             </Box>
             <Box display={"flex"} alignItems={"center"} gap={2}>
               <div className="image">
                 <img src="/images/iata-logo-0.svg" />
               </div>
               <div className="image">
                 <img src="/images/trustpilot-1.png" />
               </div>
               <div className="image">
                 <img src="/images/stars-5-1.svg" />
               </div>
             </Box>
           </div>
         </Container>
       </footer>
     </>
   );
}

export default Footer;