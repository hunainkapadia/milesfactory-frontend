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
          py: { xs: 3 },
          gap: 3,
          alignItems: { xs: "flex-start", lg: "center", md: "center" },
        }}
      >
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
