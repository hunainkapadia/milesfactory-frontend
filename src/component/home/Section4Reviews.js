import { Grid, Box, Card, Container, Typography, Avatar } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";

const reviews = [
  {
    name: "Sarah J.",
    location: "San Francisco, CA",
    image: "/images/Sarah-review-pic1.png", // No image, so it will show 'S'
    review:
      "Mylz found me flights that were 40% cheaper than what I could find elsewhere. Plus the hotel they recommended was perfect for my needs.",
  },
  {
    name: "Micheal T.",
    location: "London, UK",
   image: "/images/Micheal-review.png", // No image, so it will show 'S'
    review:
      "I was skeptical about AI travel planning at first, but Mylz changed my mind. Their bundle deals are unbeatable and saved me hours of research.",
  },
  {
    name: "Emma R.",
    location: "Sydney, Australia",
    image: "/images/Emma-review.png", // No image, so it will show 'E'
    review:
      "The local experiences Mylz suggested were the highlight of our trip. We discovered places we never would have found on our own."
  },
];

const Section4Reviews = (props) => {
  return (
    <Box position={"relative"}
      id={props.id}
      className={`${styles.HomeBannerReview} section-padding-lg white-bg no-bg`}
    >
      <section>
        <Container>
          <Box className={`${styles.ReviewSection} + ""`} position={"relative"}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Box mb={7} display={"flex"}>
                  <Box
                    sx={{ textAlign: { xs: "center", md: "left", lg: "left" } }}
                  >
                    <h2>What travelers say:</h2>
                    <Typography>
                      Real experiences from travelers who have discovered the
                      power of Mylz AI.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Grid Review */}
            <Grid container spacing={3}>
              {reviews.map((review, index) => {
                const firstLetter = review.name.charAt(0).toUpperCase();

                return (
                  <Grid item md xs={12} key={index} className={styles.IdeaCard}>
                    <Card className={`no-border p-0`} variant="outlined">
                      <Box>
                        <Box mb={4} sx={{textAlign:{xs:"center", md:"left", lg:"left"}}}>
                          {/* Star Ratings */}
                          <Box
                            display={"flex"}
                            gap={2}
                            flexDirection={"row"}
                            sx={{justifyContent:{xs:"center", md:"flex-start", lg:"flex-start"}}}
                            mb={2}
                          >
                            <Box className={styles.star}>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box className={styles.star}>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box className={styles.star}>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box className={styles.star}>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box className={styles.star}>
                              <img src="/images/star-icon.svg" />
                            </Box>
                          </Box>

                          <Typography className="f14">
                            {review.review}
                          </Typography>
                        </Box>

                        {/* Client Info */}
                        <Box display={"flex"} alignItems={"center"} gap={2}
                        sx={{justifyContent:{xs:"center", md:"flex-start", lg:"flex-start"}}}
                        >
                          <Box>
                            <Avatar
                              src={review.image}
                              alt={review.name}
                              sx={{
                                width: 48,
                                height: 48,
                                margin: "0 auto",
                                mb: 2,
                                bgcolor: review.image
                                  ? "transparent"
                                  : "#E3F2FD",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                              className="basecolor1-blue mb-0"
                            >
                              {review.image ? review.image : firstLetter}
                            </Avatar>
                          </Box>
                          <Box>
                            <h6 className="mb-0" fontWeight="bold">
                              {review.name}
                            </h6>
                            <Typography variant="body2" color="text.secondary">
                              {review.location}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
        <Footer forReview LearnMore={"Travel with Mylz"} id={"Section5App"} />
      </section>
    </Box>
  );
};

export default Section4Reviews;
