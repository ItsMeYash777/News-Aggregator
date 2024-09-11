// src/cookieUtils.js

// Set preferences in cookies with basic validation
export function setPreferences(preferences) {
  if (!Array.isArray(preferences)) {
    console.error("Preferences must be an array");
    return;
  }

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // Cookie expires in 30 days
  document.cookie = `newsPreferences=${JSON.stringify(
    preferences
  )};expires=${expiryDate.toUTCString()};path=/`;
}

// Retrieve preferences from cookies with validation
export function getPreferences() {
  const cookies = document.cookie.split("; ");
  const preferencesCookie = cookies.find((cookie) =>
    cookie.startsWith("newsPreferences=")
  );

  if (!preferencesCookie) return null;

  try {
    const preferences = JSON.parse(preferencesCookie.split("=")[1]);
    if (Array.isArray(preferences)) {
      return preferences;
    } else {
      console.error("Invalid preferences format");
      return null;
    }
  } catch (error) {
    console.error("Error parsing preferences:", error);
    return null;
  }
}
