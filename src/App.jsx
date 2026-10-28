import { useState, useEffect } from 'react';
import { loadWeather } from './api.js';
import { getErrorMessage } from './format.js';
import SearchBar from './components/SearchBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';

export default function App() {
  // The city the user searched for. Changing it triggers a new fetch.
  const [city, setCity] = useState('');
  // The data that came back from the API.
  const [weather, setWeather] = useState(null);
  // 'idle' | 'loading' | 'error' | 'success' (same four states as Assignment 4)
  const [status, setStatus] = useState('idle');
  // The message shown when something goes wrong.
  const [errorMessage, setErrorMessage] = useState('');
  // Bumped by Search and Retry so the effect runs again even for the same city.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!city) return; // nothing searched yet: stay idle

    let ignore = false;

    async function fetchWeather() {
      setStatus('loading');
      try {
        const data = await loadWeather(city);
        if (ignore) return;
        setWeather(data);
        setStatus('success');
      } catch (err) {
        if (ignore) return;
        setErrorMessage(getErrorMessage(err));
        setStatus('error');
      }
    }

    fetchWeather();

    // Cleanup: if a new search starts before this request finishes,
    // ignore the old answer so it can't overwrite the new one.
    return () => {
      ignore = true;
    };
  }, [city, attempt]);

  function handleSearch(newCity) {
    setCity(newCity);
    setAttempt((a) => a + 1);
  }

  function handleRetry() {
    setAttempt((a) => a + 1);
  }

  return (
    <main className="container">
      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={handleSearch} isLoading={status === 'loading'} />

      {status === 'idle' && <p className="status">Search for a city to see the weather.</p>}

      {status === 'loading' && <LoadingSpinner message={`Loading ${city}...`} />}

      {status === 'error' && <ErrorMessage message={errorMessage} onRetry={handleRetry} />}

      {status === 'success' && weather && <WeatherCard data={weather} />}
    </main>
  );
}
