const LOCATION_KEY = "muuza_user_location";
const LOCATION_EXPIRATION = 3 * 60 * 60 * 1000; // 3 hours

interface StoredLocation {
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

export function saveLocation(location: { latitude: number; longitude: number }) {
  const data: StoredLocation = {
    location,
    timestamp: Date.now(),
  };
  localStorage.setItem(LOCATION_KEY, JSON.stringify(data));
}

export function getLocation(): StoredLocation | null {
  const stored = localStorage.getItem(LOCATION_KEY);
  if (!stored) return null;

  const parsed = JSON.parse(stored);

  if (Date.now() - parsed.timestamp > LOCATION_EXPIRATION) {
    localStorage.removeItem(LOCATION_KEY);
    return null; // Expired
  }

  return parsed;
}

export function clearLocation() {
  localStorage.removeItem(LOCATION_KEY);
}
