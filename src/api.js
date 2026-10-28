// The key comes from the .env file (Vite only exposes variables that start with VITE_).
const API_KEY = import.meta.env.VITE_OWM_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function loadWeather(city) {
  if (!API_KEY || API_KEY === 'your_key_here') {
    throw new Error('missing-key');
  }

  const params = new URLSearchParams({
    q: city,
    units: 'metric',
    appid: API_KEY,
  });

  return getJSON(`${API_URL}?${params}`);
}
