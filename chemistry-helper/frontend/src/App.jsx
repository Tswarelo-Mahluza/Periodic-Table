import { useEffect, useState } from "react";
import SearchPage from "./pages/SearchPage";
import ComparePage from "./pages/ComparePage";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { getAllElements } from "./services/api";

// App is the top of the component tree.
// It loads the element list once and switches between the two pages.
// (With only two pages we don't need a router library: a piece of state is enough.)
export default function App() {
  const [page, setPage] = useState("search"); // "search" | "compare"
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect with [] runs once, when the app first appears on screen.
  useEffect(() => {
    getAllElements()
      .then(setElements)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Chemistry Helper</h1>
        <nav aria-label="Main">
          <button
            className={page === "search" ? "active" : ""}
            aria-current={page === "search" ? "page" : undefined}
            onClick={() => setPage("search")}
          >
            Look up
          </button>
          <button
            className={page === "compare" ? "active" : ""}
            aria-current={page === "compare" ? "page" : undefined}
            onClick={() => setPage("compare")}
          >
            Compare
          </button>
        </nav>
      </header>

      <main>
        {loading && <Loading text="Loading elements…" />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && page === "search" && <SearchPage elements={elements} />}
        {!loading && !error && page === "compare" && <ComparePage elements={elements} />}
      </main>
    </div>
  );
}
