# Weather Dashboard — React (Assignment 5)

My Assignment 4 Weather Dashboard rebuilt as a React application with Vite. It shows the current weather for any city using the OpenWeatherMap API: temperature, description, icon, feels like, humidity, wind and min/max.

## Setup

1. Install [Node.js](https://nodejs.org/) (npm comes with it).
2. Create a free account on [OpenWeatherMap](https://openweathermap.org/) and copy your API key from https://home.openweathermap.org/api_keys (a new key can take a couple of hours to activate).
3. In the project folder, copy `.env.example` to a new file called `.env` and paste your key:

   ```
   VITE_OWM_API_KEY=your_key_here
   ```

   `.env` is in `.gitignore`, so the key is never uploaded to GitHub. If the key is missing, the app still opens and shows a message telling you to add it.

4. Install the dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

5. Open http://localhost:5173

Other scripts: `npm run build` (builds into `dist/`) and `npm run preview` (serves the build).

## Project structure

```
weather-dashboard-react/
├── index.html
├── package.json
├── vite.config.js
├── .env.example            # template for the API key
└── src/
    ├── main.jsx            # mounts <App /> into #root
    ├── App.jsx             # owns the state + the useEffect fetch
    ├── api.js              # getJSON, loadWeather (from Assignment 4)
    ├── format.js           # formatTemp, formatWind, getIconUrl, getErrorMessage (from Assignment 4)
    ├── index.css           # styles
    └── components/
        ├── SearchBar.jsx
        ├── LoadingSpinner.jsx
        ├── ErrorMessage.jsx
        ├── WeatherCard.jsx
        └── WeatherDetail.jsx
```

## Component tree

```
App  (state: city, weather, status, errorMessage, attempt)
├── SearchBar       ← onSearch, isLoading    (local state: text, error)
├── LoadingSpinner  ← message                (status = 'loading')
├── ErrorMessage    ← message, onRetry       (status = 'error')
└── WeatherCard     ← data                   (status = 'success')
    └── WeatherDetail ← label, value   (×4: feels like, humidity, wind, min/max)
```

## How it works

- **State (`useState`)**: `App` holds the searched `city`, the fetched `weather` data, the `status` (`idle`, `loading`, `error` or `success`, the same four states as Assignment 4), the `errorMessage`, and an `attempt` counter. `SearchBar` keeps the typed text in its own local state, because no other component needs it until the form is submitted.
- **Data fetching (`useEffect`)**: the effect in `App` depends on `[city, attempt]`, so it runs whenever a city is searched or Retry is clicked. It defines an `async` function inside and calls it, because an effect cannot be async itself. The cleanup function sets `ignore = true`, so an old, slow response can't overwrite a newer search.
- **Errors**: `getJSON` checks `response.ok` and throws with the status code, and `getErrorMessage` turns it into a clear message (404 city not found, 401 invalid key, 429 too many requests, 5xx server problem, or no connection).
- **Conditional rendering**: `status` decides whether the page shows the hint, the spinner, the error with a Retry button, or the weather card. The Search button is disabled while loading.
- **Props (data down, events up)**: data goes down as props (`App → WeatherCard → WeatherDetail`), and events go up through callbacks (`SearchBar` calls `onSearch`, `ErrorMessage` calls `onRetry`).

## What changed from Assignment 4

- The DOM code in `render.js` (`querySelector`, `textContent`, `hidden`) is replaced by components. React updates the page when state changes.
- `main.js` event listeners are replaced by `onSubmit` / `onClick` props.
- The API key moved from `src/config.js` to a `.env` file, so a fresh clone builds even before a key is added.
- `api.js` and `format.js` are reused almost unchanged.

## Note on prop drilling

No state is passed more than two levels deep. The deepest path is `App → WeatherCard → WeatherDetail`, and `WeatherDetail` only receives plain strings (a label and a value). Context wasn't needed because no data is shared across the whole tree.
