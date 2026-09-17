export function LoadingState({ label = 'Loading content' }: { label?: string }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function FallbackNotice({ message }: { message: string }) {
  if (typeof console !== 'undefined' && console.info) {
    console.info('[IndraAstra System]', message);
  }
  return null;
}
