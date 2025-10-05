import { Box, Grid, Stack, Dialog, IconButton } from "@mui/material";
import { useState } from "react";

import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HotelDrawerGallery = ({ hotel }) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [openImage, setOpenImage] = useState(null); // currently opened image in modal

  const images = hotel?.content?.images || [];
  if (images.length === 0) return null;

  // handlers
  const handleViewAll = () => setIsViewAll(true);
  const handleHideAll = () => setIsViewAll(false);

  const handleOpenImage = (imgUrl) => setOpenImage(imgUrl);
  const handleCloseImage = () => setOpenImage(null);

  return (
    <Box component="section" className={styles.HotelGallerySection} mb={2}>
      {/* --- Main Gallery View --- */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
        className={styles.HotelGallery}
      >
        {/* Big Image on Left */}
        <Box
          className={`${styles.HotelThumb} ${styles.BigThumb}`}
          sx={{
            backgroundImage: `url(${images[0]?.url || "images/hotel-nothumb.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "10px",
            flex: "1 1 50%",
            cursor: "pointer",
          }}
          onClick={() => handleOpenImage(images[0]?.url)}
        />

        {/* Small Thumbnails on Right */}
        <Box className={styles.SmallThumbGrid}>
          {images.slice(1, 7).map((img, idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <Box
                key={idx}
                className={`${styles.SmallThumb} ${isLast ? styles.LastThumb : ""}`}
                sx={{
                  backgroundImage: `url(${img?.url || "images/hotel-nothumb.png"})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenImage(img?.url)}
              >
                {/* Show 'View all photos' overlay on last image */}
                {isLast && (
                  <Box
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening image underneath
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
          <Grid container spacing={"5px"} justifyContent={"center"}>
            {images.map((img, idx) => (
              <Grid item md={3} lg={3} sm={3} key={idx}>
                <Box
                  sx={{
                    backgroundImage: `url(${img?.url || "images/hotel-nothumb.png"})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: 80,
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenImage(img?.url)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* --- Popup Image Modal --- */}
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
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>

          <IconButton
  onClick={handleCloseImage}
  sx={{
    position: "absolute",
    top: 16,
    right: 16,
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    "&:hover": { background: "rgba(0,0,0,0.7)" },
  }}
>
  <FontAwesomeIcon icon={faTimes} />
</IconButton>
        </Box>

          <Box
            component="img"
            src={openImage}
            alt="Hotel"
            sx={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              objectFit: "contain",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default HotelDrawerGallery;
