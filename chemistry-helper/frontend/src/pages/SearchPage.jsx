import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ElementGrid from "../components/ElementGrid";
import ElementDetails from "../components/ElementDetails";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getElementByName, getElementByNumber } from "../services/api";

export default function SearchPage({ elements }) {
  const [element, setElement] = useState(null); // the element being shown
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error" | "success"
  const [error, setError] = useState("");

  // Decide which endpoint to call: all digits = atomic number, otherwise name/symbol.
  async function handleSearch(query) {
    setStatus("loading");
    setError("");

    try {
      const isNumber = /^\d+$/.test(query);
      const result = isNumber ? await getElementByNumber(query) : await getElementByName(query);
      setElement(result);
      setStatus("success");
    } catch (err) {
      setElement(null);
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <section>
      <SearchBar elements={elements} onSearch={handleSearch} disabled={status === "loading"} />

      <div className="results" aria-live="polite">
        {status === "idle" && (
          <p className="hint">Search above, or pick an element from the table below.</p>
        )}
        {status === "loading" && <Loading text="Looking up element…" />}
        {status === "error" && <ErrorMessage message={error} />}
        {status === "success" && <ElementDetails element={element} />}
      </div>

      <ElementGrid
        elements={elements}
        selectedNumber={element?.atomic_number}
        onSelect={handleSearch}
      />
    </section>
  );
}
