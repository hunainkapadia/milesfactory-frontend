import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import Image from "next/image";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import { useSelector } from "react-redux";

export default function ShareDropdown() {
  const url = useSelector((state) => state); // Optional use
  const [copied, setCopied] = useState(false); // Control visibility

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <Box className={`${styles.ShareDropdown}`}>
      {/* Share Button */}
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        className={`${styles.ShareDropdownHandle} basecolor1`}
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

      {/* Dropdown Content */}
      <Stack
        justifyContent={"center"}
        width={"100%"}
        className={`${styles.DropdownItems} DropdownItems`}
      >
        <Stack
          flexDirection={"column"}
          gap={"10px"}
          className={`${styles.DropdownItemsIn} DropdownItems`}
        >
          {/* ✅ Show this only when copied */}
          {copied && (
            <Stack gap={"4px"} flexDirection={"row"} alignItems={"center"}>
              <Image
                width={15}
                height={15}
                src="/images/success-check.svg"
                alt="Check Icon"
              />
              <Typography className="f16 basecolor1 bold">
                Trip link copied!
              </Typography>
            </Stack>
          )}

          {/* View Public Page */}
          {/* <Stack
            gap={"4px"}
            flexDirection={"row"}
            alignItems={"center"}
            pl={"19px"}
            sx={{ cursor: "pointer" }}
            onClick={() => window.open("/public-page", "_blank")} // adjust as needed
          >
            <Typography className="f12 bold">View public page</Typography>
          </Stack> */}

          {/* Copy Link Again */}
          <Stack
            gap={"4px"}
            flexDirection={"row"}
            alignItems={"center"}
            pl={"19px"}
            sx={{ cursor: "pointer" }}
            onClick={handleCopyLink}
          >
            <Typography className="f12">Copy link {copied ? "again" : ""}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
