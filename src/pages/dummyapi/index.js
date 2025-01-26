// pages/api/flightSearch.js

export default function handler(req, res) {
   // Define your dummy JSON data
   const data = {
     flightSearchResults: [
       {
         flightNumber: "AA123",
         departure: "2025-05-20T10:00:00",
         arrival: "2025-05-20T14:30:00",
         departureAirport: "JFK",
         arrivalAirport: "LAX",
         airline: "American Airlines",
         price: 199.99
       },
       {
         flightNumber: "DL456",
         departure: "2025-05-20T13:00:00",
         arrival: "2025-05-20T17:30:00",
         departureAirport: "LAX",
         arrivalAirport: "ORD",
         airline: "Delta Airlines",
         price: 250.00
       },
       {
         flightNumber: "UA789",
         departure: "2025-05-21T07:30:00",
         arrival: "2025-05-21T11:00:00",
         departureAirport: "ORD",
         arrivalAirport: "SFO",
         airline: "United Airlines",
         price: 175.00
       }
     ]
   };
 
   // Ensure the res object is valid and status is correctly called
   if (res) {
     res.status(200).json(data);
   } else {
     // Handle any issues with the response object
     console.error("Response object is undefined!");
   }
 }
 