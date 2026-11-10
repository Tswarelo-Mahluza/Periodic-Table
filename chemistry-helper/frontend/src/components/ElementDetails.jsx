import ElementTile from "./ElementTile";
import ElectronConfiguration from "./ElectronConfiguration";

// Full information card for one element.
export default function ElementDetails({ element }) {
  return (
    <article className="details">
      <ElementTile element={element} />

      <div className="details-body">
        <h2>{element.name}</h2>

        <dl className="properties">
          <div><dt>Symbol</dt><dd>{element.symbol}</dd></div>
          <div><dt>Atomic number</dt><dd>{element.atomic_number}</dd></div>
          <div><dt>Atomic mass</dt><dd>{element.atomic_mass}</dd></div>
          <div><dt>Group</dt><dd>{element.group}</dd></div>
          <div><dt>Period</dt><dd>{element.period}</dd></div>
          <div><dt>Category</dt><dd>{element.category}</dd></div>
          <div className="wide">
            <dt>Electron configuration</dt>
            <dd><ElectronConfiguration value={element.electron_configuration} /></dd>
          </div>
        </dl>

        <h3>Interesting facts</h3>
        <ul className="facts">
          {element.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
