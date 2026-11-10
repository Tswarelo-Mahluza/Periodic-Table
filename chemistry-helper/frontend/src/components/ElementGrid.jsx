import { categoryClass } from "../utils";

// A small clickable periodic table so people can browse without typing.
export default function ElementGrid({ elements, selectedNumber, onSelect }) {
  return (
    <div className="grid" role="group" aria-label="Browse elements">
      {elements.map((element) => (
        <button
          key={element.atomic_number}
          type="button"
          className={`mini ${categoryClass(element.category)} ${
            element.atomic_number === selectedNumber ? "selected" : ""
          }`}
          onClick={() => onSelect(element.atomic_number)}
          aria-label={`${element.name}, atomic number ${element.atomic_number}`}
        >
          <span className="mini-number">{element.atomic_number}</span>
          <span className="mini-symbol">{element.symbol}</span>
        </button>
      ))}
    </div>
  );
}
