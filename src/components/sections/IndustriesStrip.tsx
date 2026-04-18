import {
  Factory,
  Truck,
  Warehouse,
  Briefcase,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const industries = [
  { icon: Factory, label: "Производство" },
  { icon: Warehouse, label: "Оптовая торговля" },
  { icon: Briefcase, label: "B2B-услуги" },
  { icon: Truck, label: "Логистика" },
  { icon: GraduationCap, label: "Образование" },
  { icon: Stethoscope, label: "Медицина" },
];

export function IndustriesStrip() {
  return (
    <section
      aria-label="Отрасли, с которыми мы работали"
      className="border-b border-[var(--border)] py-10 bg-[var(--bg)]"
    >
      <Container>
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] shrink-0">
              Работали с бизнесом из отраслей
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 items-center">
              {industries.map((i) => (
                <li
                  key={i.label}
                  className="flex items-center gap-2.5 text-[14px] text-[var(--text-muted)]"
                >
                  <i.icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-[var(--text-muted)]"
                  />
                  {i.label}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
