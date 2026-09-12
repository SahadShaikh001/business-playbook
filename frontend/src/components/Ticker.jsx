import { categories } from "../data/content";

function Ticker() {
  const items = [...categories, ...categories, ...categories];

  return (
    <section className="ticker">
      <div className="ticker-track">
        {items.map((category, index) => (
          <span key={`${category}-${index}`}>
            {category}
            <b>✦</b>
          </span>
        ))}
      </div>
    </section>
  );
}

export default Ticker;
