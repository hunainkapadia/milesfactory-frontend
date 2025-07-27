import { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";

export default function ShareDropdown({ tripLink }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let timer;

  const handleMouseEnter = (event) => {
    clearTimeout(timer);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setAnchorEl(null);
    }, 200); // slight delay for smoother UX
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tripLink);
    setAnchorEl(null);
  };

  const handleViewPublicPage = () => {
    window.open("/public-page", "_blank"); // Replace with your actual link
    setAnchorEl(null);
  };

  return (
    <Box className={`${styles.Dropdown}`}>
      <Box
        display={"flex"}
        alignItems={"center"}
        className="basecolor1"
        gap={1}
      >
        <Box className="imggroup">
          <Image
            width={13}
            height={16}
            src="/images/share-icon.svg"
            alt="Share Icon"
          />
        </Box>
        <Typography className="bold">Share</Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          onMouseEnter: () => clearTimeout(timer),
          onMouseLeave: handleMouseLeave,
          elevation: 4,
          sx: { borderRadius: 2, minWidth: 200 },
        }}
        className={styles.DropdownItems}
      >
        <MenuItem disabled>
          <ListItemIcon>✅</ListItemIcon>
          <Typography>Trip link copied!</Typography>
        </MenuItem>

        <MenuItem onClick={handleViewPublicPage}>
          <ListItemIcon>🌐</ListItemIcon>
          <Typography>View public page</Typography>
        </MenuItem>

        <MenuItem onClick={handleCopy}>
          <ListItemIcon>📋</ListItemIcon>
          <Typography>Copy link again</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
