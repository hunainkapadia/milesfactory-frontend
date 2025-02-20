import { Box, Button, Container, Grid } from "@mui/material";
import Link from "next/link";
import styles from '@/src/styles/sass/components/baseLayout.module.scss'
import Head from "next/head";
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Header = ({isSearchActive}) => {
  return (
    <>
     <Head>
     
     </Head>
       <header className={`${styles.Header} basecolor1-light-bg bacecolor pt-50 ${isSearchActive ? styles.Active : ""}`}>
         <Container className="">
           <Grid className={styles.Box + " br-8 white-bg box-shadow-md"}>
             <Grid item xs={12}>
               <div
                 className={
                   " d-flex justify-content-between align-items-center"
                 }
               >
                 <div className={styles.Logo}>
                   <Link href={"/"}>
                   <div className="d-flex align-items-center">
                     <img src="/images/logo-blue.svg" />
                   </div>
                   </Link>
                 </div>
                 <Box className=" basecolor1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}>
                   <i className="fa fa-user-circle"></i>
                   <div>Login</div>
                   {/*  */}
                 </Box>
                 {/*  */}
               </div>
             </Grid>
           </Grid>
         </Container>
       </header>
     </>
   );
}

export default Header;