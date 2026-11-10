import { useState } from "react";
import ElementTile from "../components/ElementTile";
import ElectronConfiguration from "../components/ElectronConfiguration";

// Compares two elements side by side.
// The full element list is already loaded in App, so no extra request is needed here.
export default function ComparePage({ elements }) {
  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(8);

  const first = elements.find((e) => e.atomic_number === firstNumber);
  const second = elements.find((e) => e.atomic_number === secondNumber);

  // Each row of the table: a label and a function that reads the value from an element.
  const rows = [
    { label: "Symbol", get: (e) => e.symbol },
    { label: "Atomic number", get: (e) => e.atomic_number },
    { label: "Atomic mass", get: (e) => e.atomic_mass },
    { label: "Group", get: (e) => e.group },
    { label: "Period", get: (e) => e.period },
    { label: "Category", get: (e) => e.category },
    {
      label: "Electron configuration",
      get: (e) => e.electron_configuration,
      render: (e) => <ElectronConfiguration value={e.electron_configuration} />,
    },
  ];

  return (
    <section>
      <div className="pickers">
        <ElementSelect label="First element" value={firstNumber} onChange={setFirstNumber} elements={elements} />
        <ElementSelect label="Second element" value={secondNumber} onChange={setSecondNumber} elements={elements} />
      </div>

      <div className="compare-tiles">
        <ElementTile element={first} />
        <ElementTile element={second} />
      </div>

      <table className="compare-table">
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">{first.name}</th>
            <th scope="col">{second.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const differs = row.get(first) !== row.get(second);
            const show = row.render || row.get;
            return (
              <tr key={row.label} className={differs ? "differs" : ""}>
                <th scope="row">{row.label}</th>
                <td>{show(first)}</td>
                <td>{show(second)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="hint">
        {first.name} and {second.name} differ in atomic mass by{" "}
        {Math.abs(first.atomic_mass - second.atomic_mass).toFixed(3)}. Shaded rows have different values.
      </p>
    </section>
  );
}

// A labelled dropdown listing every element.
function ElementSelect({ label, value, onChange, elements }) {
  return (
    <label className="select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {elements.map((element) => (
          <option key={element.atomic_number} value={element.atomic_number}>
            {element.atomic_number}. {element.name} ({element.symbol})
          </option>
        ))}
      </select>
    </label>
  );
}
