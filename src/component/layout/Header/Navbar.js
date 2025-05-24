"use client";
import { Box, } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss"; // Import SCSS file
import { useDispatch } from "react-redux";
import { feedBack, setFeedbackDialog } from "@/src/store/slices/Base/baseSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const feedbackHandle = () => {
    dispatch(setFeedbackDialog(true));
  };

  return (
    <Box position="static" className={styles.navbar}>
      {/* Logo / Title */}
      {/* Navigation Links */}

      <Box
        className={styles.navItems}
        display={"flex"}
        gap={3}
        Give
        feedback
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", lg: "row" }, // Row on mobile, Column on desktop
          alignItems: { xs: "flex-start", lg: "center", md: "center" },
        }}
      >
        <Box component={Link} href="#" className={styles.navItem}>
          Contact support
        </Box>
        <Box onClick={feedbackHandle} className={styles.navItem + " cursor-pointer"}>
            💬 Share an idea or feedback
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
