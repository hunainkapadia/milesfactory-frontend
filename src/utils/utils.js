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

export const formatTextToHtmlList = (text) => {
  if (!text) return "";

  const lines = text.split(/\n+/);
  let html = "";
  let listItems = [];

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (/^\d+\.\s/.test(trimmed)) {
      listItems.push(`<li>${trimmed.replace(/^\d+\.\s/, "").trim()}</li>`);
    } else {
      if (listItems.length > 0) {
        html += `<ul>${listItems.join("")}</ul>`;
        listItems = [];
      }
      if (trimmed) html += `<p>${trimmed}</p>`;
    }
  });

  if (listItems.length > 0) {
    html += `<ul>${listItems.join("")}</ul>`;
  }

  return html;
};

// lib/gtag.js

// This checks if gtag is available and then sends the event
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
