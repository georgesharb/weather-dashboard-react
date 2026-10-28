import { useState } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
  // What the user is typing. Local state: only this component needs it.
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const city = text.trim();
    if (city === '') {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    onSearch(city); // send it up to App
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search">
        <label htmlFor="city-input">City</label>
        <input
          id="city-input"
          type="text"
          placeholder="e.g. Beirut"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          aria-invalid={!!error}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading}>
          Search
        </button>
      </div>
      {error && <p className="field-error">{error}</p>}
    </form>
  );
}
