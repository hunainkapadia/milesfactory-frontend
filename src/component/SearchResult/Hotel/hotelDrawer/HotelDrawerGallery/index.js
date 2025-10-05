import { Box, Grid, Button, Stack } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useState } from "react";

const HotelDrawerGallery = ({ hotel }) => {
  const [isViewAll, setIsViewAll] = useState(false);

  const handleViewAll = () => setIsViewAll(true);
  const handleHideAll = () => setIsViewAll(false);

  const images = hotel?.content?.images || [];

  if (images.length === 0) return null;

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
          }}
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
                }}
              >
                {/* Show 'View all photos' overlay on last image */}
                {isLast && (
                  <Box
                    onClick={handleViewAll}
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

      {/* --- Expanded Gallery (when View All is clicked) --- */}
      {isViewAll && (
      <Stack component={"section"} alignItems={"flex-end"} sx={{ mt: 3 }} >
          <Box className="basecolor1 cursor-pointer" onClick={handleHideAll}>Hide All</Box>
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
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default HotelDrawerGallery;
