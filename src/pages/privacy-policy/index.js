import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Header from "@/src/component/layout/Header";
import Footer from "@/src/component/layout/Footer";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import HerosectionSm from "@/src/component/layout/HerosectionSm";

const PrivacyPolicy = () => {
  return (
    <main>
      <Header />
      <section id="fold1" className={styles.HomeBanner}>
        <HerosectionSm heading={"Privacy Policy"} />
      </section>

      <Box>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="subtitle1" gutterBottom>
            Effective Date: [Insert Date]
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Data Controller:</strong> Milesfactory Ltd, Company Number
            16131941
            <br />
            <strong>Contact:</strong>{" "}
            <MuiLink href="mailto:privacy@mylz.com">privacy@mylz.com</MuiLink>
          </Typography>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              1. What Data We Collect
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>Personal details: Name, email, phone, passport info</li>
              <li>Travel details: Destinations, dates, preferences</li>
              <li>
                Payment info: Processed securely via third-party providers
              </li>
              <li>Technical data: IP address, browser type, device data</li>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              2. How We Use Your Data
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>To process and confirm bookings</li>
              <li>To communicate about your trip</li>
              <li>To improve and personalize your experience</li>
              <li>For marketing (with your consent)</li>
              <li>To comply with legal obligations</li>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              3. Sharing Your Data
            </Typography>
            <Typography paragraph>We only share your data with:</Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>
                Travel service providers (airlines, hotels, train companies)
              </li>
              <li>Payment processors</li>
              <li>Regulatory bodies, if required by law</li>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              4. Your Rights
            </Typography>
            <Typography paragraph>
              Under the UK GDPR, you have the right to:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Ask for deletion</li>
              <li>Withdraw consent at any time</li>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              5. Data Retention
            </Typography>
            <Typography paragraph>
              We retain booking data for 6 years for legal and accounting
              purposes.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              6. Security
            </Typography>
            <Typography paragraph>
              We use encryption, secure servers, and limited access to protect
              your data.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              7. Cookies
            </Typography>
            <Typography paragraph>
              We use cookies to enhance user experience and analyze traffic. You
              can manage preferences via browser settings.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer forLight />
    </main>
  );
};

export default PrivacyPolicy;
