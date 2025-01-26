import { Grid, Box, Card } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";

const IdeaDetailSection = () => {
   return (
      <section className="mb-50 mt-50">
      <p>Not sure where to start? Try these ideas:</p>
      <Grid container>
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.IdeaCard}>
          <Card className={`${styles.Box} white-bg`} variant="outlined">
            <Box >
              <Box className={`${styles.icon} mb-3`} sx={{ mb: 2 }}>
                <img
                  width={25}
                  height={25}
                  alt="Web Design / Development"
                  src="/images/sun.svg"
                />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                <p>Help me find inspiration for my next travel plan.</p>
              </Box>
            </Box>
          </Card>
        </Grid>
    
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.IdeaCard}>
          <Card className={`${styles.Box} white-bg`} variant="outlined">
            <Box >
              <Box className={`${styles.icon} mb-3`} sx={{ mb: 2 }}>
                <img
                  width={25}
                  height={25}
                  alt="Travel Price Tag"
                  src="/images/price-tag.svg"
                />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                <p>Show the cheapest travel destinations per continent.</p>
              </Box>
            </Box>
          </Card>
        </Grid>
    
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.IdeaCard}>
          <Card className={`${styles.Box} white-bg`} variant="outlined">
            <Box >
              <Box className={`${styles.icon} mb-3`} sx={{ mb: 2 }}>
                <img
                  width={25}
                  height={25}
                  alt="Alpine Ski"
                  src="/images/alpine.svg"
                />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                <p>Show the best places to ski in Europe.</p>
              </Box>
            </Box>
          </Card>
        </Grid>
    
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.IdeaCard}>
          <Card className={`${styles.Box} white-bg`} variant="outlined">
            <Box >
              <Box className={`${styles.icon} mb-3`} sx={{ mb: 2 }}>
                <img
                  width={25}
                  height={25}
                  alt="Fireworks"
                  src="/images/fireworks.svg"
                />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                <p>I know where I want to go, help me to book my flight.</p>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </section>
    
   );
}

export default IdeaDetailSection;