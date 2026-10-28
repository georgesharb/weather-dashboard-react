// One small stat box, reused four times in WeatherCard.
export default function WeatherDetail({ label, value }) {
  return (
    <div className="detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
