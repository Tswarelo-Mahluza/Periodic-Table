// Turns "[He] 2s2 2p4" into: [He] 2s² 2p⁴ (the small raised numbers use <sup>).
export default function ElectronConfiguration({ value }) {
  return (
    <span className="config">
      {value.split(" ").map((part, index) => {
        const match = part.match(/^(\d[spdf])(\d+)$/); // e.g. "2p4" -> "2p" and "4"
        return (
          <span key={index}>
            {match ? (
              <>
                {match[1]}
                <sup>{match[2]}</sup>
              </>
            ) : (
              part
            )}{" "}
          </span>
        );
      })}
    </span>
  );
}
