"use client";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss"; // Import SCSS file

const Navbar = () => {
  return (
    <Box position="static" className={styles.navbar}
      sx={{ display: { xs: "none", md: "block" } }} // Hide on mobile, show on desktop
    >
      {/* Logo / Title */}
      {/* Navigation Links */}
      <Box className={styles.navItems} display={"flex"} gap={3}>
        <Box component={Link} href="#" className={styles.navItem}>
          Our Vision
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
