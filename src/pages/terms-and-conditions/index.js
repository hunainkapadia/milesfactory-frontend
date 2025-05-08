import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Header from "@/src/component/layout/Header";
import Footer from "@/src/component/layout/Footer";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import HerosectionSm from "@/src/component/layout/HerosectionSm";

const TermsAndConditions = () => {
  return (
    <main>
      <Header />
      <section id="fold1" className={styles.HomeBanner}>
        <HerosectionSm heading={"Terms and Conditions"} />
      </section>

      <Box>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography paragraph>
            This agreement also incorporates by reference our{" "}
            <MuiLink href="/privacy-policy">Privacy Policy</MuiLink> and <MuiLink href="/sanctions-compliance-policy">Sanctions Compliance Policy</MuiLink>, which form an integral part of these
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
            enter into a binding agreement to use the Platform. You agree not
            to:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>
              Use the Platform for any unlawful, fraudulent, or abusive purpose
            </li>
            <li>Create multiple accounts without permission</li>
            <li>Use false information during sign-up or booking</li>
            <li>Interfere with the operation of the Platform</li>
          </Typography>
          <Typography paragraph>
            We reserve the right to suspend or terminate your access if we
            believe you are in violation of these terms or any applicable laws.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            3. Booking and Payment Terms
          </Typography>
          <Typography paragraph>
            You agree to provide accurate and complete payment information when
            booking travel services. By confirming a booking, you authorize Mylz
            to charge your selected payment method for the total amount, which
            may include service fees applied by Mylz. Flight fares may be
            zero-rated for VAT, while Mylz service fees may include VAT based on
            your billing location and applicable tax laws.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            4. Third-Party Services and Supplier Terms
          </Typography>
          <Typography paragraph>
            Your contract for travel services is with the third-party provider,
            not Mylz. Mylz acts solely as a facilitator and is not a party to
            the travel services contract. Mylz disclaims all liability arising
            from delays, cancellations, service quality, or conduct of
            third-party providers. You are responsible for reviewing and
            accepting the terms and conditions of each provider before
            confirming a booking.
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

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            6. Sanctions Compliance
          </Typography>
          <Typography paragraph>
            Mylz complies with all applicable international sanctions laws and
            regulations, including those of the UK, EU, and United States
            (OFAC). Access to the Platform is prohibited for individuals or
            entities located in or ordinarily resident in comprehensively
            sanctioned jurisdictions, including but not limited to: Iran, North
            Korea, Syria, Cuba, Russia, Belarus, Venezuela, and the regions of
            Crimea, Donetsk, and Luhansk. Users are solely responsible for
            ensuring compliance with applicable sanctions.
          </Typography>
          <Typography paragraph>
            Mylz reserves the right to restrict access, cancel transactions, or
            suspend accounts in the event of suspected sanctions violations.
            This policy is binding and forms an integral part of these Terms and
            Conditions.
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
            This includes, but is not limited to, acts of God, war, terrorism,
            government regulations, labor strikes, natural disasters, or
            failures by third-party systems.
          </Typography>
          <Typography paragraph>
            Mylz shall not be held liable for any loss or disruption arising
            from such events.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            10. Indemnity
          </Typography>
          <Typography paragraph>
            You agree to indemnify, defend, and hold harmless Mylz, its
            officers, directors, employees, and agents from any claims, losses,
            liabilities, and expenses arising from your use of the Platform,
            your violation of these Terms, or your infringement of any rights of
            a third party.
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
            changes are posted constitutes your acceptance of the new Terms.
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
      <Footer forLight />
    </main>
  );
};

export default TermsAndConditions;
