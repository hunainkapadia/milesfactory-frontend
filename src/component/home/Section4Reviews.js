import { Grid, Box, Card, Container, Typography, Avatar } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";

const reviews = [
  {
    name: "Sarah J.",
    location: "San Francisco, CA",
    image: "", // No image, so it will show 'S'
    review:
      "Mylz found me flights that were 40% cheaper than what I could find elsewhere. Plus the hotel they recommended was perfect for my needs.",
  },
  {
    name: "Micheal T.",
    location: "London, UK",
   //  image: "/images/michael.jpg", // Image will be shown
   image: "", // No image, so it will show 'S'
    review:
      "I was skeptical about AI travel planning at first, but Mylz changed my mind. Their bundle deals are unbeatable and saved me hours of research.",
  },
  {
    name: "Emma R.",
    location: "Sydney, Australia",
    image: "", // No image, so it will show 'E'
    review:
      "The local experiences Mylz suggested were the highlight of our trip. We discovered places we never would have found on our own."
  },
];

const Section4Reviews = (props) => {
  return (
    <section
      id={props.id}
      className={`${styles.HomeBanner} ${styles.HomeBannerReview} white-bg no-bg`}
    >
      <section>
        <Container>
          <Box
            className={`${styles.HeroSection} ${styles.ReviewSection} + ""`}
            position={"relative"}
          >
            <Grid container spacing={3} >
              <Grid item xs >
                <Box mb={7} display={"flex"}>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="h2">
                      What our travelers say:
                    </Typography>
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
                  <Grid item xs key={index} className={styles.IdeaCard}>
                    <Card
                      className={`${styles.Card} no-border p-0`}
                      variant="outlined"
                    >
                      <Box>
                        <Box mb={4}>
                          {/* Star Ratings */}
                          <Box
                            display={"flex"}
                            gap={2}
                            flexDirection={"row"}
                            mb={2}
                          >
                            <Box>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box>
                              <img src="/images/star-icon.svg" />
                            </Box>
                            <Box>
                              <img src="/images/star-icon.svg" />
                            </Box>
                          </Box>

                          <Typography className="f14">
                            {review.review}
                          </Typography>
                        </Box>

                        {/* Client Info */}
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Box>
                            <Avatar
                              src={review.image}
                              alt={review.name}
                              sx={{
                                width: 50,
                                height: 50,
                                margin: "0 auto",
                                mb: 2,
                                bgcolor: review.image
                                  ? "transparent"
                                  : "#E3F2FD",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                              className="basecolor1"
                            >
                              {!review.image && firstLetter}
                            </Avatar>
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              className="mb-0"
                              fontWeight="bold"
                            >
                              {review.name}
                            </Typography>
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
      </section>
    </section>
  );
};

export default Section4Reviews;
