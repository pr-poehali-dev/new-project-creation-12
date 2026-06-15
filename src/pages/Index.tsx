import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/76769409-5380-4cd1-a775-d2d98636b968/files/50d36e4d-2fad-4722-9b07-b47b2a5b3575.jpg';
const PROGRAM_IMG =
  'https://cdn.poehali.dev/projects/76769409-5380-4cd1-a775-d2d98636b968/files/63fa2dbf-0bbf-42ec-9250-f3e798abaab6.jpg';

const NAV = [
  { id: 'about', label: 'О школе' },
  { id: 'programs', label: 'Программы' },
  { id: 'teachers', label: 'Педагоги' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'contacts', label: 'Контакты' },
];

const VALUES = [
  {
    icon: 'Heart',
    title: 'Забота о каждом',
    text: 'Малые классы по 8–10 человек, где учитель знает имя и характер каждого ребёнка.',
  },
  {
    icon: 'Sprout',
    title: 'Через интерес',
    text: 'Учим думать и задавать вопросы, а не зубрить. Знания вырастают из любопытства.',
  },
  {
    icon: 'Users',
    title: 'Семейный уклад',
    text: 'Родители — часть школьной жизни. Вместе создаём тёплую среду для роста.',
  },
];

const PROGRAMS = [
  {
    level: '1–4 классы',
    name: 'Начальная школа',
    text: 'Бережная адаптация, чтение, счёт и творчество в игровой форме. Закладываем любовь к учёбе.',
  },
  {
    level: '5–9 классы',
    name: 'Средняя школа',
    text: 'Углублённые предметы, проектная работа и развитие самостоятельности. Готовим к осознанному выбору.',
  },
  {
    level: 'Доп. занятия',
    name: 'Мастерские',
    text: 'Искусство, музыка, естественные науки и языки — пространство для талантов вне расписания.',
  },
];

const TEACHERS = [
  { name: 'Анна Петрова', role: 'Начальные классы', initials: 'АП' },
  { name: 'Михаил Орлов', role: 'Математика и физика', initials: 'МО' },
  { name: 'Елена Соколова', role: 'Русский язык и литература', initials: 'ЕС' },
  { name: 'Дмитрий Зайцев', role: 'Искусство и творчество', initials: 'ДЗ' },
];

const SCHEDULE = [
  { time: '08:30', title: 'Утренний круг', desc: 'Настраиваемся на день вместе' },
  { time: '09:00', title: 'Основные уроки', desc: 'Главные предметы дня' },
  { time: '11:30', title: 'Прогулка и обед', desc: 'Свежий воздух и отдых' },
  { time: '13:00', title: 'Мастерские', desc: 'Творчество, наука, языки' },
  { time: '15:00', title: 'Свободная игра', desc: 'Время для себя и друзей' },
];

const FAQ = [
  {
    q: 'С какого возраста можно поступить?',
    a: 'Мы принимаем детей в начальную школу с 6,5 лет и в средние классы — по результатам собеседования с ребёнком и родителями.',
  },
  {
    q: 'Сколько детей в классе?',
    a: 'В каждом классе от 8 до 10 учеников. Это позволяет педагогу уделить внимание каждому ребёнку.',
  },
  {
    q: 'Выдаёте ли вы аттестат?',
    a: 'Да, обучение проходит по аккредитованной программе, ученики получают документ государственного образца.',
  },
  {
    q: 'Как проходит адаптация новых учеников?',
    a: 'Первые недели за ребёнком закрепляется наставник, а родители получают регулярную обратную связь.',
  },
  {
    q: 'Можно ли прийти на пробный день?',
    a: 'Конечно. Оставьте заявку в разделе «Контакты», и мы пригласим вас познакомиться со школой.',
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground paper-texture">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Зёрнышко
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => scrollTo('contacts')}
            className="hidden md:inline-flex rounded-full"
          >
            Записаться
          </Button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left py-1 text-muted-foreground"
              >
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="rounded-full mt-2">
              Записаться
            </Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="container pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-float-up">
            <p className="font-hand text-3xl text-primary mb-4">частная семейная школа</p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
              Место, где детство <span className="text-primary">растёт</span> в знание
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Начальное и среднее образование в тёплой атмосфере, где каждый
              ребёнок учится с радостью и остаётся собой.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo('contacts')}
                className="rounded-full px-8"
              >
                Записаться на пробный день
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('programs')}
                className="rounded-full px-8 border-primary/30"
              >
                Наши программы
              </Button>
            </div>
          </div>
          <div className="relative animate-float-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-accent rounded-[2.5rem] rotate-3" />
            <img
              src={HERO_IMG}
              alt="Дети в семейной школе"
              className="relative rounded-[2rem] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* About / Values */}
      <section id="about" className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-hand text-2xl text-primary mb-2">о школе</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            Мы верим в обучение через заботу
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5">
                <Icon name={v.icon} size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{v.title}</h3>
              <p className="text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-secondary/40 rounded-[2.5rem] -rotate-2" />
            <img
              src={PROGRAM_IMG}
              alt="Программы обучения"
              className="relative rounded-[2rem] w-full object-cover shadow-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-hand text-2xl text-primary mb-2">программы</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8">
              От первых букв до взрослых решений
            </h2>
            <div className="space-y-5">
              {PROGRAMS.map((p) => (
                <div key={p.name} className="flex gap-4">
                  <span className="shrink-0 mt-1 text-xs font-semibold px-3 py-1 rounded-full bg-accent text-accent-foreground h-fit">
                    {p.level}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                    <p className="text-muted-foreground">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section id="teachers" className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-hand text-2xl text-primary mb-2">педагоги</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            Люди, которым можно доверить детство
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEACHERS.map((t) => (
            <div key={t.name} className="text-center">
              <div className="aspect-square rounded-3xl bg-accent flex items-center justify-center mb-4">
                <span className="font-display text-4xl font-semibold text-primary">
                  {t.initials}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="bg-accent/40 py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-hand text-2xl text-primary mb-2">расписание</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Как устроен наш день
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {SCHEDULE.map((s) => (
              <div
                key={s.time}
                className="flex items-center gap-6 bg-card rounded-2xl p-5 border border-border"
              >
                <span className="font-display text-2xl font-semibold text-primary w-20 shrink-0">
                  {s.time}
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-hand text-2xl text-primary mb-2">вопросы</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Часто спрашивают
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-2xl px-6"
              >
                <AccordionTrigger className="text-left font-display text-xl font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container py-20">
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 md:p-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-hand text-3xl mb-3 opacity-90">приходите в гости</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
                Запишитесь на пробный день
              </h2>
              <p className="opacity-80 max-w-sm">
                Познакомьтесь со школой, педагогами и атмосферой. Мы расскажем
                всё о поступлении и ответим на любые вопросы.
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="tel:+70000000000"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-4 hover:bg-primary-foreground/20 transition-colors"
              >
                <Icon name="Phone" size={22} />
                <span>+7 (000) 000-00-00</span>
              </a>
              <a
                href="mailto:hello@zernyshko.ru"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-4 hover:bg-primary-foreground/20 transition-colors"
              >
                <Icon name="Mail" size={22} />
                <span>hello@zernyshko.ru</span>
              </a>
              <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-4">
                <Icon name="MapPin" size={22} />
                <span>г. Москва, ул. Тихая, 12</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-display text-lg font-semibold text-foreground">
              Зёрнышко
            </span>
          </div>
          <p>© 2026 Семейная школа «Зёрнышко». Растём вместе.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
