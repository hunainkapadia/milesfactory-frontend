"use client";

import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import { useSelector } from "react-redux";

export default function ShareDropdown() {
  const url = useSelector((state) => state); // Optional
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    // Close dropdown after 3 seconds
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 5000);
  };

  return (
    <Box
      className={styles.ShareDropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => !copied && setIsOpen(false)} // Don't close if copied state is active
      sx={{ position: "relative" }}
    >
      {/* Share Button */}
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"4px"}
        className={`${styles.ShareDropdownHandle} basecolor1`}
        sx={{ cursor: "pointer",  }}
      >
        <Box className="imggroup">
          <Image
            width={13}
            height={16}
            src="/images/share-icon.svg"
            alt="Share Icon"
          />
        </Box>
        <Typography sx={{mb:"2px"}} className="bold">Share</Typography>
      </Box>

      {/* Dropdown Content */}
      {isOpen && (
        <Stack
          justifyContent="center"
          className={styles.DropdownItems}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            background: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "12px",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          {/* Show success message */}
          <Stack flexDirection={"column"} alignItems={"center"} gap={"10px"}>
            {copied && (
              <Stack
                gap="6px"
                flexDirection="row"
                alignItems="center"
                
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/success-check.svg"
                  alt="Check Icon"
                />
                <Typography className="f14 basecolor1 bold">
                  Trip link copied!
                </Typography>
              </Stack>
            )}
            <Stack
              gap="4px"
              flexDirection="row"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={handleCopyLink}
            >
              <Typography className="f14">
                {copied ? "Copy link again" : "Copy link"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
