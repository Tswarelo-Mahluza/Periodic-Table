// Shown when a request fails. role="alert" makes screen readers announce it.
export default function ErrorMessage({ message }) {
  return (
    <div className="status status-error" role="alert">
      {message}
    </div>
  );
}
