"use client";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss"; // Import SCSS file

const Navbar = () => {
  return (
    <Box position="static" className={styles.navbar}>
      {/* Logo / Title */}
      {/* Navigation Links */}
      <Box className={styles.navItems} display={"flex"} gap={4}>
        <Box component={Link} href="#" className={styles.navItem}>
          Our Vision
        </Box>

        <Box component={Link} href="#" className={styles.navItem}>
          Get Inspired
        </Box>

        <Box component={Link} href="#" className={styles.navItem}>
          Book a Trip
        </Box>

        <Box component={Link} href="#" className={styles.navItem}>
          My Trips
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
