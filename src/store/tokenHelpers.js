import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    console.log("Decoded token:", decoded);
    console.log("Current time:", currentTime);
    console.log("Token exp:", decoded.exp);

    return decoded.exp < currentTime;
  } catch (e) {
    console.error("❌ Failed to decode token", e);
    return true;
  }
}
