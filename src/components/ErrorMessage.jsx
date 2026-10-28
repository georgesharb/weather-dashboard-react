export default function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert">
      <p className="status error">{message}</p>
      <button className="retry" type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
