import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

type Member = {
  initials: string;
  name: string;
  role: string;
  focus: string;
  stack: string[];
  accent?: boolean;
};

const team: Member[] = [
  {
    initials: "АК",
    name: "Аркадий Каприелов",
    role: "Основатель, системный архитектор",
    focus:
      "Ведёт аудиты и проектирование. До AK Systems — 9 лет в разработке B2B-систем для среднего бизнеса.",
    stack: ["Архитектура", "Битрикс24", "1С-интеграции"],
    accent: true,
  },
  {
    initials: "ДМ",
    name: "Дмитрий М.",
    role: "Tech Lead, backend",
    focus:
      "Платформы, API, интеграции. Отвечает за production-окружение и деплой.",
    stack: ["Python", "Node.js", "PostgreSQL"],
  },
  {
    initials: "ЕС",
    name: "Елена С.",
    role: "Битрикс24 Lead",
    focus:
      "Настройка CRM, бизнес-процессы, роботы и триггеры. 40+ проектов на Битрикс24.",
    stack: ["Битрикс24", "BP", "BI-отчёты"],
  },
  {
    initials: "ИП",
    name: "Илья П.",
    role: "Frontend / UI",
    focus:
      "Личные кабинеты, дашборды, сложные интерфейсы. Рисует и пишет код.",
    stack: ["React", "Next.js", "TypeScript"],
  },
];

function Avatar({ initials, accent }: { initials: string; accent?: boolean }) {
  return (
    <div
      className={`relative h-14 w-14 rounded-xl border overflow-hidden flex items-center justify-center ${
        accent
          ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]"
          : "border-[var(--border)] bg-[var(--bg)]"
      }`}
    >
      <span
        className={`mono text-[16px] font-semibold tracking-wide ${
          accent ? "text-[var(--accent-hover)]" : "text-[var(--text-muted)]"
        }`}
      >
        {initials}
      </span>
    </div>
  );
}

export function Team() {
  return (
    <section
      id="team"
      className="section relative border-b border-[var(--border)] overflow-hidden"
    >
      <AmbientAurora variant="split" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Команда"
          title="Кто будет делать ваш проект"
          subtitle="Не фрилансеры-одиночки. Каждый отвечает за свою часть архитектуры."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {team.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.05}>
              <article className="h-full p-7 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-start gap-4">
                  <Avatar initials={m.initials} accent={m.accent} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[17px] font-semibold tracking-tight text-[var(--text)] leading-tight">
                      {m.name}
                    </div>
                    <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mt-1.5">
                      {m.role}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[14.5px] leading-[1.65] text-[var(--text-muted)]">
                  {m.focus}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {m.stack.map((s) => (
                    <span
                      key={s}
                      className="mono inline-flex h-6 px-2 items-center rounded-md border border-[var(--border)] text-[11px] text-[var(--text-muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <p className="mono text-[12px] text-[var(--text-dim)] text-center max-w-2xl mx-auto">
            Фото команды по запросу — присылаем в КП после первого созвона.
            Публично не размещаем: NDA с клиентами.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
