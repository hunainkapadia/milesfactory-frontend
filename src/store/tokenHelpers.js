// utils/tokenHelpers.js

export function isTokenExpired(token) {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);

    

    return decoded.exp < currentTime;
  } catch (e) {
    console.error("Failed to decode token", e);
    return true; // consider expired if decoding fails
  }
}
