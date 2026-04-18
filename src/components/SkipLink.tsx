export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:inline-flex focus:h-10 focus:items-center focus:px-4 focus:rounded-md focus:bg-[var(--accent)] focus:text-white focus:text-[13px] focus:font-medium"
    >
      Перейти к содержанию
    </a>
  );
}
