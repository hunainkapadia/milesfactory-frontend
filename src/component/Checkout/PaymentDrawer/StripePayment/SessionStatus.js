export default function handler(req, res) {
   const { session_id } = req.query;
 
   if (session_id === "complete") {
     res.status(200).json({
       status: "complete",
       customer_email: "customer@example.com",
     });
   } else {
     res.status(200).json({ status: "open", customer_email: "" });
   }
 }
 