"use client";
import { Box, } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss"; // Import SCSS file

const Navbar = () => {
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
        <Box component={Link} href="#" className={styles.navItem}>
            Give feedback
        </Box>

        <Box component={Link} href="#" className={styles.navItem}>
          My trips
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
