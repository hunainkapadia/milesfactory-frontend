import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Container, Grid } from "@mui/system";
import styles from "@/src/styles/sass/components/Home.module.scss";

const HeroSection = () => {
  const handleSearch = () => {
    console.log("Searching...");
    // Add your AI search logic here
  };
  return (
    <section>
      <Container>
        <Box
          className={styles.HeroSection + " "}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <div>
            <div className="mb-40 align-center">
              <h1 className="darkgray">Travel made simple</h1>
              <p className="darkgray">Your AI travel buddy, for smarter, stress-free trips</p>
            </div>
            <section className="mb-50 SearchBoxSection">
              <TextField
                fullWidth
                placeholder="Describe your trip, and I’ll do the rest"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton >
                        <i className="fa fa-arrow-right"></i>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </section>
            <section className="mb-50">
              <p >Not sure where to start? Try these ideas:</p>
              <Grid container  spacing={2}>
                <Grid className={styles.IdeaCard} size={{ lg: 3, md: 3 }}>
                  <Card className={styles.Box + " white-bg"} variant="outlined">
                    <div>
                      <div>
                        <Box className={styles.icon + " mb-3"} sx={{ mb: 2 }}>
                          <img
                            width={"25"}
                            height={"25"}
                            alt="Web Design / Development"
                            src="/images/sun.svg"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: {
                              xs: "none",
                              sm: "block",
                              lg: "block",
                              md: "block",
                            }, // Visible on mobile (xs), hidden on tablet+ (sm)
                          }}
                        >
                          <p>
                            Help me find inspiration for my next travel plan.
                          </p>
                        </Box>
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid className={styles.IdeaCard} size={{ lg: 3, md: 3 }}>
                  <Card className={styles.Box + " white-bg"} variant="outlined">
                    <div>
                      <div>
                        <Box className={styles.icon + " mb-3"} sx={{ mb: 2 }}>
                          <img
                            width={"25"}
                            height={"25"}
                            alt="Web Design / Development"
                            src="/images/price-tag.svg"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: {
                              xs: "none",
                              sm: "block",
                              lg: "block",
                              md: "block",
                            }, // Visible on mobile (xs), hidden on tablet+ (sm)
                          }}
                        >
                          <p>
                            Show the cheapest travel destinations per continent
                          </p>
                        </Box>
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid className={styles.IdeaCard} size={{ lg: 3, md: 3 }}>
                  <Card className={styles.Box + " white-bg"} variant="outlined">
                    <div>
                      <div>
                        <Box className={styles.icon + " mb-3"} sx={{ mb: 2 }}>
                          <img
                            width={"25"}
                            height={"25"}
                            alt="Web Design / Development"
                            src="/images/alpine.svg"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: {
                              xs: "none",
                              sm: "block",
                              lg: "block",
                              md: "block",
                            }, // Visible on mobile (xs), hidden on tablet+ (sm)
                          }}
                        >
                          <p>Show the best places to ski in Europe</p>
                        </Box>
                      </div>
                    </div>
                  </Card>
                </Grid>
                {/*  */}
                <Grid className={styles.IdeaCard} size={{ lg: 3, md: 3 }}>
                  <Card className={styles.Box + " white-bg"} variant="outlined">
                    <div>
                      <div>
                        <Box className={styles.icon + " mb-3"} sx={{ mb: 2 }}>
                          <img
                            width={"25"}
                            height={"25"}
                            alt="Web Design / Development"
                            src="/images/fireworks.svg"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: {
                              xs: "none",
                              sm: "block",
                              lg: "block",
                              md: "block",
                            }, // Visible on mobile (xs), hidden on tablet+ (sm)
                          }}
                        >
                          <p>
                            I know where i want to go, help me to book my flight
                          </p>
                        </Box>
                      </div>
                    </div>
                  </Card>
                </Grid>
              </Grid>
              {/*  */}
            </section>
          </div>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
