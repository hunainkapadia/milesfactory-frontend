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
         <HerosectionSm heading={"Terms and Conditions"}   /> 
      </section>
      
      <Box>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="subtitle1" gutterBottom>
          Effective Date: [Insert Date]
        </Typography>

        <Typography variant="body1" gutterBottom>
          Company: Milesfactory Ltd (Company Number 16131941)
          <br />
          Website:{" "}
          <MuiLink href="https://www.mylz.com" target="_blank" rel="noopener">
            www.mylz.com
          </MuiLink>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          1. Introduction
        </Typography>
        <Typography paragraph>
          These Terms and Conditions ("Terms") govern your use of the Mylz platform, operated by
          Milesfactory Ltd. By accessing or using our services, you agree to be bound by these Terms.
          If you do not agree, please refrain from using our platform.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          2. Definitions
        </Typography>
        <Typography paragraph>
          <strong>Mylz:</strong> The online platform operated by Milesfactory Ltd. <br />
          <strong>User:</strong> Any individual or entity accessing or using Mylz. <br />
          <strong>Customer:</strong> A User who makes a booking through Mylz. <br />
          <strong>Services:</strong> The travel-related services offered via Mylz, including flight,
          hotel, and train bookings. <br />
          <strong>Supplier:</strong> Third-party providers of travel services, such as airlines, hotels,
          and train operators.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          3. Eligibility
        </Typography>
        <Typography paragraph>
          Users must be at least 18 years old and possess the legal authority to enter into contracts.
          By using Mylz, you confirm that you meet these requirements.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          4. Account Registration
        </Typography>
        <Typography paragraph>
          To access certain features, you may need to create an account. You agree to:
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>Provide accurate and complete information.</li>
          <li>Maintain the confidentiality of your account credentials.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          5. Booking Process
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>
            <strong>Search and Selection:</strong> Users can search for travel services based on
            various criteria.
          </li>
          <li>
            <strong>Booking:</strong> Upon selecting a service, Users can proceed to book by
            providing necessary details and making payment.
          </li>
          <li>
            <strong>Confirmation:</strong> After successful payment, a confirmation email with
            booking details will be sent.
          </li>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          6. Payments
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>All payments are processed securely through third-party payment gateways.</li>
          <li>
            Prices are displayed in <strong>[Insert Currency]</strong> and include applicable taxes and
            fees.
          </li>
          <li>Mylz reserves the right to adjust prices due to changes from Suppliers.</li>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          7. Cancellations and Refunds
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>
            Cancellation and refund policies vary by Supplier. Users are advised to review these
            policies before booking.
          </li>
          <li>
            Mylz will facilitate cancellation requests but is not responsible for Supplier policies or
            decisions.
          </li>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          8. User Responsibilities
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>Use Mylz for lawful purposes only.</li>
          <li>Not engage in fraudulent activities.</li>
          <li>Not resell or make speculative bookings.</li>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          9. Intellectual Property
        </Typography>
        <Typography paragraph>
          All content on Mylz, including text, graphics, logos, and software, is the property of
          Milesfactory Ltd or its licensors and is protected by intellectual property laws.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          10. Limitation of Liability
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>
            Mylz acts as an intermediary between Users and Suppliers and is not responsible for the
            acts or omissions of Suppliers.
          </li>
          <li>
            Milesfactory Ltd shall not be liable for indirect, incidental, or consequential damages
            arising from the use of Mylz.
          </li>
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          11. Modifications to Terms
        </Typography>
        <Typography paragraph>
          Milesfactory Ltd reserves the right to modify these Terms at any time. Continued use of Mylz
          after changes indicates acceptance of the new Terms.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          12. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms are governed by the laws of England and Wales. Any disputes shall be subject
          to the exclusive jurisdiction of the courts of England and Wales.
        </Typography>
      </Container>
    </Box>
      <Footer forLight />
    </main>
  );
};

export default TermsAndConditions;
