import {
  Lock,
  Compass,
  Target,
  Package2,
  Users,
  FileText,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

const items = [
  {
    icon: Lock,
    title: "Фиксированная цена и срок",
    body: "В КП — конкретная цифра и дата. Если уложимся быстрее — цена та же. Перерасход — наша проблема, не ваша.",
  },
  {
    icon: Compass,
    title: "Архитектура до кода",
    body: "Сначала проектируем систему на бумаге. Только потом пишем код. Это дороже на старте, но в 3 раза дешевле в эксплуатации.",
  },
  {
    icon: Target,
    title: "Специализация на среднем бизнесе",
    body: "Не берёмся за стартапы на коленке и за корпорации с бюрократией. Работаем с 20–200 сотрудниками — знаем эти боли наизусть.",
  },
  {
    icon: Package2,
    title: "Работаем в продуктах, а не часах",
    body: "Заказчику не надо считать, сколько часов «списали». Вы платите за результат, а не за процесс.",
  },
  {
    icon: Users,
    title: "Команда, а не фрилансер-одиночка",
    body: "Аналитик, архитектор, backend, frontend, DevOps, PM. Каждый занимается своей частью — без «человека-оркестра».",
  },
  {
    icon: FileText,
    title: "NDA и прозрачный договор",
    body: "Договор подряда, акты, закрывающие. NDA подписываем до обсуждения деталей проекта.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="section relative border-b border-[var(--border)] overflow-hidden"
    >
      <AmbientAurora variant="corners" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Почему AK Systems"
          title="Не агентство. Инженерная команда."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
          {items.map((i, idx) => (
            <FadeIn
              key={i.title}
              delay={idx * 0.04}
              className="bg-[var(--surface)]"
            >
              <div className="p-8 h-full">
                <i.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-[var(--accent-hover)]"
                />
                <h3 className="mt-5 text-[18px] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {i.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--text-muted)]">
                  {i.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
