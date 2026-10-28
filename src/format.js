// Small helper functions, kept from Assignment 4.

export function formatTemp(value) {
  return `${Math.round(value)}°C`;
}

// API gives m/s, convert to km/h
export function formatWind(speed) {
  return `${Math.round(speed * 3.6)} km/h`;
}

export function getIconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export function getErrorMessage(err) {
  if (err.message === 'missing-key') {
    return 'No API key found. Create a .env file (see README) and restart npm run dev.';
  }
  if (err.status === 404) {
    return 'City not found. Check the spelling and try again.';
  }
  if (err.status === 401) {
    return 'Invalid API key. Check your .env file.';
  }
  if (err.status === 429) {
    return 'Too many requests. Wait a bit and try again.';
  }
  if (err.status >= 500) {
    return 'The weather server has a problem. Try again later.';
  }
  return "Couldn't connect. Check your internet connection.";
}
