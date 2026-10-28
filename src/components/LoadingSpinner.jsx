export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <p className="status loading" role="status">
      <span className="spinner" aria-hidden="true"></span>
      {message}
    </p>
  );
}
