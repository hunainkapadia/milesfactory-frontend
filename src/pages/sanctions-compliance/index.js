import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Header from "@/src/component/layout/Header";
import Footer from "@/src/component/layout/Footer";
import HerosectionSm from "@/src/component/layout/HerosectionSm";
import styles from "@/src/styles/sass/components/Home.module.scss";

const SanctionsPolicy = () => {
  return (
    <Box component={"main"}>
      <Header isUser isLandingPages={"isLandingPages"}  />
      <Box component={"section"} id="fold1" className={` ${styles.PagesBanner}`}>
        <HerosectionSm heading={"Sanctions Compliance"} />
      </Box>

      <Box>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Last Modified: May 18th, 2025
          </Typography>
          <Typography paragraph>
            Milesfactory LTD, trading as Mylz (“Mylz”, “we”, “our”), is committed to complying with all applicable international sanctions
            laws and regulations, including those administered by:
          </Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>The United Kingdom (Office of Financial Sanctions Implementation – OFSI)</li>
              <li>The United States (Office of Foreign Assets Control – OFAC)</li>
              <li>The European Union</li>
              <li>The United Nations Security Council</li>
              <li>and other relevant regulatory authorities in jurisdictions where we operate or serve customers.</li>
            </Typography>
            
          <Typography paragraph>
            This Sanctions Compliance Policy outlines our responsibilities, controls, and user obligations in 
            connection with the use of our travel platform at <MuiLink href="https://www.gomylz.com" target="_blank" rel="noopener">
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
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>Iran</li>
              <li>North Korea</li>
              <li>Syria</li>
              <li>Cuba</li>
              <li>Russia</li>
              <li>Belarus</li>
              <li>Venezuela</li>
              <li>Territories of Ukraine: Crimea, Donetsk (DNR), and Luhansk (LNR)</li>
            </Typography>
            <Typography paragraph>
              While certain flights to or from these regions may be technically available via our third-party 
              booking partners, Mylz reserves the right to block platform access or cancel bookings if we determine they pose a 
              sanctions or regulatory compliance risk.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              2. Sanctioned Individuals, Entities, and Ownership
            </Typography>
            <Typography paragraph>
              Mylz prohibits the use of its platform by any person or entity that is:
            </Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>Designated on any applicable international sanctions list, including:</li>
                  <ul>
                    <li>The U.S. OFAC Specially Designated Nationals (SDN) List</li>
                    <li>The UK Sanctions List</li>
                    <li>The EU Consolidated Financial Sanctions List</li>
                    <li>The UN Consolidated List, or any other relevant national authority list</li>
                  </ul>
              <li>Owned or controlled (directly or indirectly) by any sanctioned person or entity</li>
              <li>Acting on behalf of or at the direction of a designated party</li>
            </Typography>
            <Typography paragraph>
                Users must warrant that neither they nor any beneficial owners, directors, 
                shareholders, or agents involved in bookings or transactions are listed or associated with a restricted party.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              3. Controls and Monitoring
            </Typography>
            <Typography paragraph>
              Mylz maintains a risk-based sanctions compliance programme that includes:
            </Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>IP-based geolocation filtering to restrict access from high-risk or sanctioned regions</li>
              <li>Transaction monitoring to detect potential sanctions violations or suspicious activity</li>
              <li>Screening of user identities, where applicable, using third-party compliance tools and regulated partners</li>
              <li>Use of third-party regulated partners (e.g. Stripe, Duffel, HBX) who operate their own compliance controls and screening layers</li>
            </Typography>
            <Typography paragraph >
              We reserve the right to request further information from users, including documentation to verify identity, residency, 
              or beneficial ownership, where required for compliance.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              4. Enforcement and Termination
            </Typography>
            <Typography paragraph>
              Mylz reserves the right to take any of the following actions, at its sole discretion and without prior notice, 
              in response to actual or suspected sanctions violations:
            </Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>Block or restrict platform access from sanctioned regions or IP addresses</li>
              <li>Refuse or cancel bookings involving sanctioned persons or jurisdictions</li>
              <li>Suspend or terminate user accounts involved in prohibited conduct</li>
              <li>Disclose relevant user or transaction data to our partners or to legal/regulatory authorities as required by law</li>
            </Typography>
            <Typography paragraph>
              Use of Mylz in breach of this policy constitutes a violation of our Terms & Conditions and may result in immediate service 
              suspension or termination.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              5. Supplier and Partner Obligations
            </Typography>
            <Typography paragraph>
              This policy applies to all users, including:
            </Typography>
            <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
              <li>Individual travellers</li>
              <li>Corporate customers</li>
              <li>Third-party agents</li>
              <li>Suppliers and B2B partners</li>
            </Typography>
            <Typography paragraph>
              We require all suppliers and platform partners operating through Mylz to maintain their own sanctions compliance programmes 
              and to refrain from using our services in violation of applicable sanctions laws. Mylz reserves the right to terminate any supplier or partner relationship that exposes us to sanctions risk or reputational harm.
            </Typography>


            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              6. Contact and Questions
            </Typography>
            <Typography paragraph>
              We take sanctions compliance seriously and are here to help clarify any concerns. 
              If you have questions about this Sanctions Compliance Policy or believe you may be affected by a 
              restriction, please contact our compliance team at:{" "}
              <MuiLink href="mailto:compliance@gomylz.com">
                compliance@gomylz.com
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Footer partnerLogos forLight />
    </Box>
  );
};

export default SanctionsPolicy;
