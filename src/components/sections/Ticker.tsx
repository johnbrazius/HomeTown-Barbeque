const words = ["Oak", "Smoke", "Patience", "Fire", "Red Hook", "Brooklyn"];

/** Slow decorative strip between hero and story. Hidden from assistive tech. */
export function Ticker() {
  const run = [...words, ...words];
  return (
    <div aria-hidden className="overflow-hidden border-y border-ink/15 bg-ember py-4 text-cream">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {run.map((w, i) => (
              <li key={`${k}-${i}`} className="display flex items-center text-3xl md:text-4xl">
                <span className="px-6">{w}</span>
                <span className="text-ink/50">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
