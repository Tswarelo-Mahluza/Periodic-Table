// Shown while we wait for the backend.
export default function Loading({ text = "Loading…" }) {
  return (
    <div className="status" role="status">
      <span className="spinner" aria-hidden="true" />
      {text}
    </div>
  );
}
