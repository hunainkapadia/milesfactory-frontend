"use client";
import { Box, } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss"; // Import SCSS file
import { useDispatch } from "react-redux";
import { feedBack, setContactDialog, setFeedbackDialog, setInviteEmailDialog } from "@/src/store/slices/Base/baseSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const feedbackHandle = () => {
    dispatch(setFeedbackDialog(true));
  };
  const contactHandle=()=> {
    dispatch(setContactDialog(true))
  }
  const inviteEmailHandle=()=> {
    dispatch(setInviteEmailDialog(true))
  }

  return (
    <Box position="static" className={styles.navbar}>
      {/* Logo / Title */}
      {/* Navigation Links */}

      <Box
        className={styles.navItems}
        display={"flex"}
        
        Give
        feedback
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", lg: "row" }, // Row on mobile, Column on desktop
          alignItems: { xs: "flex-start", lg: "center", md: "center" },
        }}
      >
        <Box onClick={contactHandle}  className={styles.navItem + " cursor-pointer"}>
          Contact support
        </Box>
        <Box onClick={feedbackHandle} className={styles.navItem + " cursor-pointer"}>
            Share Mylz with friends
        </Box>
        <Box onClick={inviteEmailHandle} className={styles.navItem + " cursor-pointer"}>
            Explore community trips
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
