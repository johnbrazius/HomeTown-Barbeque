/**
 * Text-only concept wordmark. This is NOT the restaurant's official logo —
 * replace it with authorized brand artwork before any commercial use.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="display text-[1.55rem] tracking-[0.02em]">Hometown</span>
      <span className="label mt-1 text-[0.58rem] tracking-[0.42em] opacity-70">Bar-B-Que · Red Hook</span>
    </span>
  );
}
