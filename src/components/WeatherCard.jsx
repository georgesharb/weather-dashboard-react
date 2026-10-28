import { formatTemp, formatWind, getIconUrl } from '../format.js';
import WeatherDetail from './WeatherDetail.jsx';

export default function WeatherCard({ data }) {
  const { name, sys, main, wind, weather } = data;
  const { description, icon } = weather[0];

  return (
    <section className="weather">
      <div className="weather-top">
        <div>
          <h2>
            {name}, {sys.country}
          </h2>
          <p className="description">{description}</p>
        </div>
        <img src={getIconUrl(icon)} alt={description} />
      </div>

      <p className="temp">{formatTemp(main.temp)}</p>

      <div className="details">
        <WeatherDetail label="Feels like" value={formatTemp(main.feels_like)} />
        <WeatherDetail label="Humidity" value={`${main.humidity}%`} />
        <WeatherDetail label="Wind" value={formatWind(wind.speed)} />
        <WeatherDetail
          label="Min / Max"
          value={`${formatTemp(main.temp_min)} / ${formatTemp(main.temp_max)}`}
        />
      </div>
    </section>
  );
}
