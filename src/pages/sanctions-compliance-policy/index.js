import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Header from "@/src/component/layout/Header";
import Footer from "@/src/component/layout/Footer";
import HerosectionSm from "@/src/component/layout/HerosectionSm";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";

const SanctionsPolicy = () => {
  return (
    <main>
      <Header />
      <section id="fold1" className={styles.HomeBanner}>
        <HerosectionSm heading={"Sanctions Compliance Policy"} />
      </section>

      <Box>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography paragraph>
            Milesfactory LTD, trading as Mylz (“Mylz”, “we”, “our”), is committed to complying with all applicable international sanctions laws and regulations, including those administered by the United Kingdom (OFSI), United States (OFAC), and the European Union. This Sanctions Compliance Policy outlines our responsibilities, controls, and user obligations in connection with the use of our travel platform at{" "}
            <MuiLink href="https://www.gomylz.com" target="_blank" rel="noopener">
              gomylz.com
            </MuiLink>.
          </Typography>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              1. Prohibited Countries and Regions
            </Typography>
            <Typography paragraph>
              Mylz does not permit access to or transactions involving the following jurisdictions:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>Iran</li>
              <li>North Korea</li>
              <li>Syria</li>
              <li>Cuba</li>
              <li>Russia</li>
              <li>Belarus</li>
              <li>Venezuela</li>
              <li>Regions of Ukraine: Crimea, Donetsk, and Luhansk</li>
            </Typography>
            <Typography paragraph>
              We reserve the right to block access to our platform from these regions and to cancel any transactions we believe may involve these territories.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              2. Sanctioned Individuals and Entities
            </Typography>
            <Typography paragraph>
              Mylz prohibits the use of our platform by individuals or entities designated on international sanctions lists, including:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>U.S. OFAC Specially Designated Nationals (SDN) List</li>
              <li>UK Sanctions List</li>
              <li>EU Consolidated Sanctions List</li>
            </Typography>
            <Typography paragraph>
              Users are solely responsible for ensuring they are not subject to such restrictions. We may screen and block transactions that appear to violate these requirements.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              3. Controls and Monitoring
            </Typography>
            <Typography paragraph>
              Mylz employs preventive controls, including:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>IP-based geolocation filtering to restrict access from high-risk or sanctioned regions</li>
              <li>Transactional monitoring and risk assessment to detect suspicious or potentially non-compliant activity</li>
              <li>Reliance on regulated partners who maintain their own sanctions compliance programs</li>
            </Typography>
            <Typography paragraph>
              We review our policies regularly and update our controls as needed to remain aligned with evolving sanctions frameworks.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              4. Enforcement and Termination
            </Typography>
            <Typography paragraph>
              Mylz reserves the right to:
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>Deny access to or suspend accounts using our platform in breach of sanctions</li>
              <li>Cancel bookings or transactions involving prohibited jurisdictions or individuals</li>
              <li>Cooperate with legal and regulatory authorities as required by law</li>
            </Typography>
            <Typography paragraph>
              Any violation of this policy constitutes a breach of our Terms & Conditions and may result in immediate suspension or termination of services.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              5. Contact and Questions
            </Typography>
            <Typography paragraph>
              If you have questions about this Sanctions Compliance Policy or its application, please contact our compliance team at:{" "}
              <MuiLink href="mailto:compliance@gomylz.com">
                compliance@gomylz.com
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Footer forLight />
    </main>
  );
};

export default SanctionsPolicy;
