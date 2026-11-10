import { categoryClass } from "../utils";

// The classic periodic-table tile. Used large in the results and compare views.
export default function ElementTile({ element }) {
  return (
    <div className={`tile ${categoryClass(element.category)}`}>
      <span className="tile-number">{element.atomic_number}</span>
      <span className="tile-symbol">{element.symbol}</span>
      <span className="tile-name">{element.name}</span>
      <span className="tile-mass">{element.atomic_mass}</span>
    </div>
  );
}
