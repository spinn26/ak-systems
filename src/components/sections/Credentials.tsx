import { Shield, Award, FileCheck2, Server } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const items = [
  {
    icon: Award,
    title: "Золотой партнёр Битрикс24",
    sub: "с 2019 года, 50+ внедрений",
  },
  {
    icon: Shield,
    title: "Работаем по 152-ФЗ",
    sub: "NDA до обсуждения, ЭДО по запросу",
  },
  {
    icon: FileCheck2,
    title: "Договор подряда с этапами",
    sub: "Фиксированный скоуп, срок, цена",
  },
  {
    icon: Server,
    title: "Деплой на ваш сервер",
    sub: "Или в РФ-облако: Yandex Cloud, Selectel",
  },
];

export function Credentials() {
  return (
    <section className="border-b border-[var(--border)] py-10 lg:py-14 bg-[var(--bg-alt)]">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
            {items.map((i) => (
              <div
                key={i.title}
                className="p-5 lg:p-6 bg-[var(--bg-alt)] flex items-start gap-4"
              >
                <i.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-[var(--accent-hover)] shrink-0 mt-0.5"
                />
                <div>
                  <div className="text-[14px] font-medium leading-tight text-[var(--text)]">
                    {i.title}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.45] text-[var(--text-muted)]">
                    {i.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
