export default function handler(req, res) {
   // Simulate client secret from Stripe
   res.status(200).json({ clientSecret: "test_client_secret_123" });
 }
 