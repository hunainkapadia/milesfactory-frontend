export const formatTextWithBreaks = (text) => {
  return text.replace(/\n/g, "<br>");
};

export const currencySymbols = {
  EUR: "€",
  GBP: "£",
  USD: "$",
  AUD: "A$",
  CAD: "C$",
  INR: "₹",
  JPY: "¥",
  CNY: "¥",
  CHF: "CHF",
};


export const sanitizeResponse = (response) => {
  if (!response) return "";

  // If response is an object, convert it to a string (formatted JSON)
  if (typeof response === "object") {
    return JSON.stringify(response, null, 2); // Pretty-print JSON
  }

  // Ensure response is a string before calling replace
  const responseString = String(response);

  return responseString.replace(/Executing functions\..*?{.*?}/gs, "").trim();
};