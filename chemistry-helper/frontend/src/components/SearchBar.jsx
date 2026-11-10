import { useState } from "react";

// A controlled form: React state always holds what is typed in the box.
// The <datalist> gives the browser's built-in autocomplete using element names.
export default function SearchBar({ elements, onSearch, disabled }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    if (text.trim()) onSearch(text.trim());
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="element-search" className="sr-only">
        Search for an element
      </label>
      <input
        id="element-search"
        type="search"
        list="element-names"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Name, symbol or atomic number, e.g. Carbon, Na, 8"
        autoComplete="off"
      />
      <datalist id="element-names">
        {elements.map((element) => (
          <option key={element.atomic_number} value={element.name} />
        ))}
      </datalist>
      <button type="submit" disabled={disabled}>
        Search
      </button>
    </form>
  );
}
