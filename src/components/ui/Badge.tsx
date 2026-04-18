import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "price" | "accent";
}) {
  const toneClasses = {
    default:
      "border-[var(--border)] text-[var(--text-muted)] bg-transparent",
    price:
      "border-[var(--border)] text-[var(--price)] bg-transparent",
    accent:
      "border-[var(--accent)]/40 text-[var(--accent-hover)] bg-[var(--accent-soft)]",
  }[tone];

  return (
    <span
      className={cn(
        "mono inline-flex items-center h-7 px-2.5 rounded-md border text-[12px] leading-none tracking-tight",
        toneClasses,
        className,
      )}
    >
      {children}
    </span>
  );
}
