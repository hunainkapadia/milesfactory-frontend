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
function capitalize(text = "") {
  return text
    .trim() // remove extra spaces
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


// hotel
// utils/distance.js
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1); // Distance in km (1 decimal place)
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function capitalizeFirstWord(text = "") {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function convertMarkdownToHtml(text) {
    if (!text) return "";
    // 1. Convert **bold** to span with class
    let result = text.replace(
      /\*\*(.*?)\*\*/g,
      "<span class='heading exbold'>$1</span>"
    );
    // 2. Remove leading "- " before text on each line
    result = result.replace(/^- /gm, "");

    return result;
  }
