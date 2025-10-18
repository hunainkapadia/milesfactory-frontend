"use client";

import {
  Box,
  Grid,
  Stack,
  Dialog,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const HotelDrawerGallery = ({ hotel, roomCode }) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [openImage, setOpenImage] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get images (roomCode first, fallback to GEN)
  let images =
    hotel?.content?.images?.filter((img) => img.roomCode === roomCode) || [];
  if (!images.length) {
    images =
      hotel?.content?.images?.filter(
        (img) => !img.roomCode && img.imageTypeCode === "GEN"
      ) || [];
  }

  if (images.length === 0) return null;

  const totalImages = isMobile ? 3 : 6;
  const previewImages = images.slice(1, totalImages + 1);

  // ✅ Handlers
  const handleOpenImage = (imgUrl) => setOpenImage(imgUrl);
  const handleCloseImage = () => setOpenImage(null);
  const handleViewAll = () => setIsViewAll(true);
  const handleHideAll = () => setIsViewAll(false);

  return (
    <>
      <Box component="section" className={styles.HotelGallerySection} mb={2}>
        {/* --- Main Gallery --- */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
          }}
          className={styles.HotelGallery}
        >
          {/* Big image on left (desktop only) */}
          {!isMobile && (
            <Box
              className={`${styles.HotelThumb} ${styles.BigThumb}`}
              sx={{
                backgroundImage: `url(${images[0]?.url_800})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                flex: "1 1 50%",
                cursor: "pointer",
              }}
              onClick={() => handleOpenImage(images[0]?.url_800)}
            />
          )}

          {/* Small thumbnails on right */}
          <Box className={styles.SmallThumbGrid}>
          {console.log("previewImages", totalImages)}
            {previewImages.map((img, idx) => {
              const isLast = idx === previewImages.length - 1;
              return (
                <Box
                  key={idx}
                  className={`${styles.SmallThumb} ${
                    isLast ? styles.LastThumb : ""
                  }`}
                  sx={{
                    backgroundImage: `url(${img?.url_800})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenImage(img?.url_800)}
                >
                  {/* Show 'View all photos' overlay on last image */}
                  {isLast && images.length > totalImages && (
                    <Box
                      onClick={(e) => {
                        e.stopPropagation(); // prevent modal from opening
                        handleViewAll();
                      }}
                      className={styles.ViewAllBtn}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      View all photos
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* --- Expanded Gallery (View All) --- */}
        {isViewAll && (
          <Stack component="section" alignItems="flex-end" sx={{ mt: 3 }}>
            <Box
              className="basecolor1 cursor-pointer"
              onClick={handleHideAll}
            >
              Hide All
            </Box>
          </Stack>
        )}

        {isViewAll && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={"5px"} justifyContent="center">
              {images.map((img, idx) => (
                <Grid item md={3} sm={4} xs={4} key={idx}>
                  <Box
                    sx={{
                      backgroundImage: `url(${img?.url_800})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: 80,
                      borderRadius: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenImage(img?.url_800)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      {/* --- Image Modal --- */}
      <Dialog
        open={Boolean(openImage)}
        onClose={handleCloseImage}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleCloseImage}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { background: "rgba(0,0,0,0.7)" },
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>

          <Box
            component="img"
            src={openImage}
            alt="Hotel"
            sx={{
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              objectFit: "contain",
              maxHeight: "90vh",
              width: "100%",
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default HotelDrawerGallery;
