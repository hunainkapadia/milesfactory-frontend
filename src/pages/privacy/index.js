import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Header from "@/src/component/layout/Header";
import Footer from "@/src/component/layout/Footer";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import HerosectionSm from "@/src/component/layout/HerosectionSm";

const PrivacyPolicy = () => {
  return (
    <main>
      <Header isUser isMessage={"isMessage"}  />
      <section id="fold1" className={styles.HomeBanner}>
        <HerosectionSm heading={"Privacy"} />
      </section>

      <Box>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Last Modified: May 18th, 2025
          </Typography>

          <Typography paragraph>
            This Privacy policy describes how Milesfactory LTD, trading as Mylz
            (“Mylz”, “we”, “us”), collects, uses, and protects your personal
            information when you use our platform at{" "}
            <MuiLink
              href="https://www.gomylz.com"
              target="_blank"
              rel="noopener"
            >
              gomylz.com
            </MuiLink>{" "}
            (the “Platform”).
          </Typography>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              1. Who We Are
            </Typography>
            <Typography paragraph>
              Mylz is a UK-based travel technology company providing users with
              the ability to search, personalize, and book travel services such
              as flights, ground transport, accommodations, and experiences
              through AI-powered tools and integrations with third-party
              providers.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              2. What Data We Collect
            </Typography>
            <Typography paragraph>
              We collect different types of data depending on your interaction
              with the Platform:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>
                If you use the Platform anonymously, we do not collect personal
                data beyond what is required for functionality (e.g., essential
                cookies).
              </li>
              <li>
                If you create an account, we may collect your name, email,
                preferred languages, travel preferences, passport details,
                payment card details, and chat history.
              </li>
              <li>
                If you register using a social login (Google, Facebook, or
                Apple), we may also collect your associated profile information
                (e.g., profile photo, name, verified email).
              </li>
              <li>
                We do not collect or process sensitive data (such as health,
                biometric, or religious information).
              </li>
            </Typography>

            <Typography paragraph sx={{ mt: 2 }}>
              We use your data to:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>
                Provide and personalize your travel search and booking
                experience
              </li>
              <li>
                Improve the quality and responsiveness of our AI and user flows
              </li>
              <li>Analyze usage trends and optimize performance</li>
              <li>Fulfill bookings and customer support requests</li>
            </Typography>

            <Typography paragraph sx={{ mt: 2 }}>
              Conversation history is stored for account-based users to deliver
              more personalized responses and streamline the booking process.
              Anonymous users’ interactions are not stored beyond the session.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              3. AI and Automated Processing
            </Typography>
            <Typography paragraph>
              We use large language models (LLMs) to power conversational
              interactions and personalize travel recommendations. For
              account-based users, your conversations may be analyzed by
              automated systems to detect booking issues, improve UX, or
              evaluate AI performance.
            </Typography>
            <Typography paragraph>
              No automated decisions are made that would have legal or similarly
              significant effects on users. Mylz does not involve human review
              of individual conversations, although aggregate patterns may be
              used to guide platform improvements.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              4. Cookies and Analytics
            </Typography>
            <Typography paragraph>
              Mylz uses only essential cookies required for platform operation
              unless you create an account or opt into analytics. We may use
              third-party analytics services such as Google Analytics and
              Tableau to understand site usage. These tools may collect
              anonymized technical data (e.g., browser type, pages visited).
            </Typography>
            <Typography paragraph>
              We may also use social media tools for login and engagement (e.g.,
              Google, Facebook, Apple).
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              5. Data Sharing and Third Parties
            </Typography>
            <Typography paragraph>
              We do not sell your personal data. We may share limited,
              aggregated, and anonymized data with trusted travel partners for
              analytics and performance insights. Personal user data is not
              shared with travel partners unless necessary to complete a
              booking.
            </Typography>
            <Typography paragraph>
              We use third-party services to support platform functionality
              including:
            </Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>Payment processors</li>
              <li>Social sign-in services (Google, Facebook, Apple)</li>
              <li>Analytics platforms (e.g., Google Analytics, Tableau)</li>
            </Typography>
            <Typography paragraph>
              These providers process data under contract and only for the
              purposes we instruct. Payment card information is processed
              securely by a regulated third-party payment processor (e.g.,
              Stripe) and is never stored directly on Mylz systems.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              6. Data Retention and Deletion
            </Typography>
            <Typography paragraph>
              For account-based users, we retain conversation history and
              personal data (including passport and payment card details) for up
              to 12 months unless otherwise requested.
            </Typography>
            <Typography paragraph>
              You may request the deletion of your account or data at any time
              by contacting us at{" "}
              <MuiLink href="mailto:privacy@gomylz.com">
                privacy@gomylz.com
              </MuiLink>
              .
            </Typography>
            <Typography paragraph>
              Anonymous usage data is not stored.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              7. User Rights
            </Typography>
            <Typography paragraph>You have the right to:</Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>Access the data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Object to or restrict certain types of processing</li>
              <li>File a complaint with a data protection authority</li>
            </Typography>
            <Typography paragraph>
              To exercise your rights, contact:{" "}
              <MuiLink href="mailto:privacy@gomylz.com">
                privacy@gomylz.com
              </MuiLink>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              8. Data Storage and International Transfers
            </Typography>
            <Typography paragraph>
              Data may be processed and stored in the United Kingdom, the
              European Economic Area (EEA), or the United States, depending on
              infrastructure location.
            </Typography>
            <Typography paragraph>
              We ensure appropriate safeguards are in place for all data
              transfers outside the UK or EEA in compliance with GDPR and other
              applicable laws.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              9. Children’s Privacy
            </Typography>
            <Typography paragraph>
              The Platform is not intended for users under the age of 18. We do
              not knowingly collect or process data from children under 18.
            </Typography>
            <Typography paragraph>
              Our Terms & Conditions require all users to confirm they are 18
              years or older. If we discover such data has been collected, we
              will delete it promptly.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              10. Changes to This Policy
            </Typography>
            <Typography paragraph>
              We may update this Privacy Policy from time to time. We will
              notify users of material changes and post the updated version on{" "}
              <MuiLink
                href="https://www.gomylz.com"
                target="_blank"
                rel="noopener"
              >
                gomylz.com
              </MuiLink>{" "}
              with a new effective date.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              11. Contact Us
            </Typography>
            <Typography paragraph>
              If you have questions about this Privacy Policy or our data
              practices, please contact us at:{" "}
              <MuiLink href="mailto:privacy@gomylz.com">
                privacy@gomylz.com
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer partnerLogos forLight />
    </main>
  );
};

export default PrivacyPolicy;
