// All communication with the FastAPI backend lives in this one file.
// Components never call fetch() directly, which keeps them simple.

// Change this by creating a frontend/.env file with VITE_API_URL=...
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`);
  } catch {
    // fetch() only throws when the server cannot be reached at all.
    throw new Error("Cannot reach the server. Check that the backend is running on port 8000.");
  }

  if (!response.ok) {
    // FastAPI sends errors as { "detail": "message" }.
    const body = await response.json().catch(() => ({}));
    const message = typeof body.detail === "string" ? body.detail : "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return response.json();
}

export const getAllElements = () => request("/elements");
export const getElementByName = (name) => request(`/elements/${encodeURIComponent(name)}`);
export const getElementByNumber = (number) => request(`/elements/number/${number}`);
