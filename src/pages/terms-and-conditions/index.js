import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Header from "@/src/component/layout/Header";
import Footer from "@/src/component/layout/Footer";
import styles from "@/src/styles/sass/components/Home.module.scss";
import HerosectionSm from "@/src/component/layout/HerosectionSm";

const TermsAndConditions = () => {
  return (
    <Box component={"main"}>
      <Header isUser isLandingPages={"isLandingPages"}  />
      <Box component={"section"} id="fold1" className={` ${styles.PagesBanner}`}>
        <HerosectionSm heading={"Terms and Conditions"} />
      </Box>

      <Box>
        <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Last Modified: May 18th, 2025
          </Typography>
          <Typography paragraph>
            This agreement also incorporates by reference our{" "}
            <MuiLink href="/privacy">Privacy Policy</MuiLink> and <MuiLink href="/sanctions-compliance">Sanctions Compliance Policy</MuiLink>, which form an integral part of these
            Terms.
          </Typography>

          <Typography paragraph>
            These Terms and Conditions ("Terms") constitute a legally binding
            agreement between you ("User", "you") and Milesfactory LTD, a
            company registered in the United Kingdom, trading as Mylz ("Mylz",
            "we", "our", or "us"), governing your use of the Mylz platform
            available at{" "}
            <MuiLink
              href="https://www.gomylz.com"
              target="_blank"
              rel="noopener"
            >
              gomylz.com
            </MuiLink>{" "}
            (the "Platform").
          </Typography>

          <Typography paragraph>
            By accessing or using the Platform, you agree to be bound by these
            Terms. If you do not agree to these Terms, please do not use the
            Platform.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            1. Scope of Services
          </Typography>
          <Typography paragraph>
            Mylz operates as a digital travel platform that enables users to
            search for, compare, and book travel services such as flights, rail
            and bus transport, accommodations, and travel-related experiences.
            Mylz acts as an intermediary, facilitating access to third-party
            travel service providers and aggregators. All bookings made through
            the Platform are subject to the individual terms and conditions of
            the respective service providers.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            2. User Eligibility and Conduct
          </Typography>
          <Typography paragraph>
            You must be at least 18 years of age and have the legal capacity to
            enter into a binding agreement to use the Platform. By using Mylz, you warrant that:
          </Typography>

          <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
            <li>
              You are not subject to any international sanctions restrictions
            </li>
            <li>You are not acting on behalf of a sanctioned party or under the control of one</li>
            <li>You will comply with all applicable laws, including those relating to export controls, anti-bribery, and trade restrictions</li>
          </Typography>
          <Typography paragraph>
            You agree not to:
          </Typography>
          <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
            <li>
              Use the Platform for any unlawful, fraudulent, or abusive purpose
            </li>
            <li>Create multiple accounts without permission</li>
            <li>Use false, misleading, or incomplete information</li>
            <li>Interfere with the operation of the Platform</li>
            <li>Circumvent or attempt to bypass any geographic, identity, or risk filters</li>
          </Typography>
          <Typography paragraph>
            We reserve the right to restrict access, suspend accounts, or report activity where we believe there is a violation of applicable laws, these Terms, or risk to Mylz or its partners.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            3. Booking and Payment Terms
          </Typography>
          <Typography paragraph>
            You agree to provide accurate and complete payment information when
            booking travel services. By confirming a booking, you authorize Mylz
            to charge your selected payment method for the total amount, which
            may include service fees applied by Mylz.
          </Typography> 
          <Typography paragraph>
            Flight fares may be zero-rated for VAT, while Mylz service fees may include VAT based on
            your billing location and applicable tax laws.
          </Typography>  
          <Typography paragraph>
            All bookings are subject to final confirmation. In the event that a third-party provider cancels or modifies an offer, Mylz may either offer an alternative or refund, but is not responsible for pricing or availability errors.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            4. Third-Party Services and Supplier Terms
          </Typography>
          <Typography paragraph>
            Your contract for travel services is with the third-party provider, not Mylz. Mylz acts solely as a facilitator and is not a 
            party to the travel services contract.
          </Typography>
          <Typography paragraph>
            Mylz disclaims all liability arising from delays, cancellations, quality of service, local fees, health/safety incidents, 
            or the conduct of third-party providers. You are responsible for reviewing and accepting the terms and conditions of each provider 
            before confirming a booking.
          </Typography>
          <Typography paragraph>
            Where bookings are made via providers such as Stripe, Duffel, or Hotelbeds (HBX), you also agree to be bound by any technical 
            and legal terms they require for processing and fulfilment.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            5. Cancellations, Changes and Refunds
          </Typography>
          <Typography paragraph>
            Cancellation, amendment, and refund policies vary by provider. Mylz
            will support you in communicating with third-party providers but is
            not liable for their decisions. Platform service fees are
            non-refundable unless explicitly stated otherwise.
          </Typography>
          <Typography paragraph>
            Where refund eligibility depends on prepayment timing or non-refundable fares, Mylz bears no responsibility for provider 
            policies or timing errors beyond its control.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            6. Sanctions Compliance
          </Typography>
          <Typography paragraph>
            Mylz complies with all applicable international sanctions laws and regulations, including those of the United Kingdom (OFSI), 
            United States (OFAC), European Union, and other applicable jurisdictions.
          </Typography>
          <Typography paragraph>
            Use of the Platform is strictly prohibited for:
          </Typography>
          <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
            <li>
            Persons located in or ordinarily resident in comprehensively sanctioned countries or regions, including: Iran, North Korea, Syria, Cuba, 
            Russia, Belarus, Venezuela, and the regions of Crimea, Donetsk, and Luhansk
            </li>
            <li>Individuals or entities designated on international sanctions lists (e.g. OFAC SDN List, UK Sanctions List, EU Consolidated List)</li>
            <li>Entities or users who are owned or controlled, directly or indirectly, by a sanctioned party</li>
            <li>Users acting on behalf of or in coordination with restricted individuals or entities</li>
          </Typography>
          <Typography paragraph>
            By using the Platform, you represent and warrant that none of the above restrictions apply to you or your use of our services. 
            Mylz reserves the right to:
          </Typography>
          <Typography gutterBottom component="ul" sx={{ pl: 3 }}>
            <li>
              Restrict, suspend, or terminate your access without notice
            </li>
            <li>Cancel any bookings involving sanctioned jurisdictions or parties</li>
            <li>Share data with compliance partners or authorities as required</li>
          </Typography>
          <Typography paragraph>
            Violations of this policy are treated as material breaches of these Terms and may result in immediate enforcement actions. 
            For more details, see our full <MuiLink href="/sanctions-compliance">Sanctions Compliance Policy</MuiLink>.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            7. Intellectual Property
          </Typography>
          <Typography paragraph>
            All content, trademarks, logos, and software on the Platform are the
            intellectual property of Mylz or its licensors. You may not copy,
            reproduce, distribute, or create derivative works from any part of
            the Platform without our express written consent.
          </Typography>
          <Typography paragraph>
            If you submit any feedback, suggestions, or user-generated content
            to Mylz, you grant us a non-exclusive, royalty-free, and worldwide
            license to use, reproduce, modify, and display such content for the
            purpose of operating and improving our services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            8. Limitation of Liability and Assumption of Risk
          </Typography>
          <Typography paragraph>
            To the fullest extent permitted by law, Mylz shall not be liable for
            any direct, indirect, incidental, or consequential damages arising
            from your use of the Platform or third-party services. You
            acknowledge that all travel involves inherent risks (e.g. delays,
            disruptions, geopolitical events), and you assume full
            responsibility for any such risks associated with your bookings.
          </Typography>
          <Typography paragraph>
            In no event shall Mylz’s liability exceed the amount paid by you for
            the specific transaction giving rise to the claim.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            9. Service Interruptions and Force Majeure
          </Typography>
          <Typography paragraph>
            Mylz may temporarily suspend access to the Platform due to
            maintenance, technical issues, or circumstances beyond its control.
            This includes, but are not limited to:
          </Typography>
          <Typography paragraph>
            Natural disasters, war, terrorism, government action, pandemics, supplier failure, internet outages, and legal restrictions.
          </Typography>
          <Typography paragraph>
            We are not liable for any disruption or loss resulting from these events.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            10. Indemnity
          </Typography>
          <Typography paragraph>
            You agree to indemnify, defend, and hold harmless Mylz, its officers, directors, employees, and agents from any claims, losses, 
            liabilities, and expenses (including legal fees) arising from:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>
              Your use of the Platform
            </li>
            <li>Your violation of these Terms or any applicable law</li>
            <li>Your breach of our Sanctions Compliance Policy</li>
            <li>Any misrepresentation of your identity, status, or eligibility</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            11. Governing Law and Jurisdiction
          </Typography>
          <Typography paragraph>
            These Terms are governed by the laws of England and Wales. Any
            disputes arising in connection with these Terms shall be subject to
            the exclusive jurisdiction of the courts of England.
          </Typography>
          <Typography paragraph>
            The English version of these Terms shall govern in the event of
            discrepancies with any translations.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            12. Amendments
          </Typography>
          <Typography paragraph>
            We may update these Terms at any time by posting a revised version
            on the Platform. Your continued use of the Platform after any
            changes are posted constitutes your acceptance of the updated Terms.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            13. Contact Information
          </Typography>
          <Typography paragraph>
            For any questions about these Terms, please contact us at:{" "}
            <MuiLink href="mailto:support@gomylz.com">
              support@gomylz.com
            </MuiLink>
          </Typography>
        </Container>
      </Box>
      <Footer partnerLogos forLight />
    </Box>
  );
};

export default TermsAndConditions;
