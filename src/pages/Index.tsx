import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Реальные фото со старого сайта familyclassistra.ru
const PHOTO_1 = 'https://familyclassistra.ru/wp-content/uploads/2023/08/xz_2mi6XIQs.jpg';
const PHOTO_2 = 'https://familyclassistra.ru/wp-content/uploads/2023/08/zsZvA15cu_4-1.jpg';
const PHOTO_3 = 'https://familyclassistra.ru/wp-content/uploads/2023/08/sg9FkcE1gWE.jpg';
const PHOTO_4 = 'https://familyclassistra.ru/wp-content/uploads/2023/08/x9XlMKhGHQc.jpg';

const NAV = [
  { id: 'about', label: 'О школе' },
  { id: 'programs', label: 'Программы' },
  { id: 'teachers', label: 'Педагоги' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'news', label: 'Новости' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'contacts', label: 'Контакты' },
];

const VALUES = [
  {
    icon: 'Heart',
    title: 'Забота о каждом',
    text: 'Малые классы — педагог знает каждого ребёнка, его интересы и темп роста.',
  },
  {
    icon: 'Sprout',
    title: 'Живое обучение',
    text: 'Путешествия по странам, игры, творчество, обсуждение фильмов — учёба через жизнь.',
  },
  {
    icon: 'Users',
    title: 'Семейный уклад',
    text: 'Мы находимся в городе Истра, создавая тёплую атмосферу, где родители — партнёры.',
  },
];

const PROGRAMS = [
  {
    level: '1–4 классы',
    name: 'Начальная школа',
    text: 'Бережная адаптация, чтение, счёт и творчество в игровой форме. Закладываем любовь к учёбе на всю жизнь.',
  },
  {
    level: '5–9 классы',
    name: 'Средняя школа',
    text: 'Углублённые предметы, проектная работа и развитие самостоятельности. Набираем 1 класс — присоединяйтесь!',
  },
  {
    level: 'Лето',
    name: 'Летний лагерь',
    text: 'Путешествуем по странам, играем на свежем воздухе, занимаемся творчеством и смотрим фильмы на английском.',
  },
];

const TEACHERS = [
  { name: 'Наши педагоги', role: 'Опытные и любящие детей', initials: '❤' },
  { name: 'Малые классы', role: 'Внимание каждому', initials: '👁' },
  { name: 'Творчество', role: 'Искусство и наука', initials: '🎨' },
  { name: 'Английский', role: 'С первого класса', initials: '🌍' },
];

const SCHEDULE = [
  { time: '08:30', title: 'Утренний круг', desc: 'Настраиваемся на день вместе' },
  { time: '09:00', title: 'Основные уроки', desc: 'Главные предметы дня' },
  { time: '11:30', title: 'Прогулка и обед', desc: 'Свежий воздух и отдых' },
  { time: '13:00', title: 'Мастерские', desc: 'Творчество, наука, языки' },
  { time: '15:00', title: 'Свободная игра', desc: 'Время для себя и друзей' },
];

const NEWS = [
  {
    title: 'Наш летний лагерь',
    date: 'Август 2023',
    text: 'Подошла к концу первая неделя нашего лагеря! Как же быстро пролетело время в весёлой компании. Ребята путешествовали по странам (Япония, Северная и Южная Америка), играли на свежем воздухе — среди фаворитов игра «Вышибалы», занимались творчеством, смотрели и обсуждали мультфильмы и фильмы на английском. Это были очень познавательные и в то же время весёлые дни.',
    img: PHOTO_3,
  },
  {
    title: 'Набираем 1 класс',
    date: 'Август 2023',
    text: 'familyclassistra открывает набор в первый класс! Мы ищем ребят, которые хотят учиться в тёплой семейной атмосфере, где каждый ребёнок важен. Приходите на пробный день и познакомьтесь с нашей школой.',
    img: PHOTO_4,
  },
];

const FAQ = [
  {
    q: 'Где находится школа?',
    a: 'Мы находимся в городе Истра, Московская область. Точный адрес смотрите в разделе «Контакты» — там есть ссылка на карту.',
  },
  {
    q: 'С какого возраста можно поступить?',
    a: 'Мы принимаем детей в начальную школу с 6,5 лет. В средние классы — по результатам собеседования с ребёнком и родителями.',
  },
  {
    q: 'Сколько детей в классе?',
    a: 'В каждом классе небольшое количество учеников — так педагог может уделить внимание каждому ребёнку и выстроить индивидуальный подход.',
  },
  {
    q: 'Есть ли летний лагерь?',
    a: 'Да! Каждое лето мы проводим лагерь, где дети путешествуют по странам, занимаются творчеством и смотрят фильмы на английском языке.',
  },
  {
    q: 'Выдаёте ли вы аттестат?',
    a: 'Обучение проходит по программе с аттестацией. Подробности узнавайте при записи — мы расскажем всё о документах.',
  },
  {
    q: 'Можно ли прийти на пробный день?',
    a: 'Конечно! Напишите нам или позвоните — пригласим вас познакомиться со школой, педагогами и атмосферой.',
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 min-w-0">
            <span className="text-2xl shrink-0">🌱</span>
            <span className="font-display text-lg md:text-2xl font-semibold tracking-tight whitespace-nowrap">
              FamilyClassIstra
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-6">
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
          <div className="md:hidden absolute top-20 left-0 right-0 border-t border-border bg-white shadow-lg px-4 py-3 flex flex-col gap-1 max-h-[calc(100vh-80px)] overflow-y-auto z-50">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left py-3 px-2 text-muted-foreground hover:text-primary transition-colors rounded-lg border-b border-border/50 last:border-0"
              >
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="rounded-full mt-3 mb-1 w-full">
              Записаться на пробный день
            </Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="container pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-float-up">
            <p className="font-hand text-3xl text-primary mb-4">г. Истра · семейная школа</p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
              Здесь учатся <span className="text-primary">думать,</span> а не просто знать
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Начальное и среднее образование в тёплой семейной атмосфере города Истра.
              Каждый ребёнок учится с радостью и остаётся собой.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo('contacts')}
                className="rounded-full px-8 w-full sm:w-auto"
              >
                Записаться на пробный день
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('programs')}
                className="rounded-full px-8 border-primary/30 w-full sm:w-auto"
              >
                Наши программы
              </Button>
            </div>
          </div>
          <div className="relative animate-float-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-accent rounded-[2.5rem] rotate-3" />
            <img
              src={PHOTO_1}
              alt="familyclassistra — семейная школа в Истре"
              className="relative rounded-[2rem] w-full object-cover shadow-xl max-h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* About / Values */}
      <section id="about" className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-hand text-2xl text-primary mb-2">о школе</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            Семейная школа в Истре
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            familyclassistra — это место, где учёба переплетается с жизнью: путешествиями,
            творчеством, играми и настоящей дружбой.
          </p>
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
              src={PHOTO_2}
              alt="Программы обучения familyclassistra"
              className="relative rounded-[2rem] w-full object-cover shadow-xl max-h-[480px]"
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
          <p className="text-muted-foreground mt-4 text-lg">
            Наши педагоги создают атмосферу, в которой каждый ребёнок чувствует себя
            важным и любимым.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEACHERS.map((t) => (
            <div key={t.name} className="text-center">
              <div className="aspect-square rounded-3xl bg-accent flex items-center justify-center mb-4">
                <span className="text-5xl">{t.initials}</span>
              </div>
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-10">
          Хотите познакомиться с педагогами лично?{' '}
          <button
            onClick={() => scrollTo('contacts')}
            className="text-primary underline underline-offset-4"
          >
            Приходите на пробный день
          </button>
        </p>
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
                className="flex items-center gap-6 bg-white rounded-2xl p-5 border border-border"
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

      {/* News */}
      <section id="news" className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-hand text-2xl text-primary mb-2">новости</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            Жизнь школы
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {NEWS.map((n) => (
            <div key={n.title} className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src={n.img}
                  alt={n.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{n.date}</span>
                <h3 className="font-display text-2xl font-semibold mt-2 mb-3">{n.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{n.text}</p>
              </div>
            </div>
          ))}
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
              <p className="font-hand text-3xl mb-3 opacity-90">г. Истра, Московская область</p>
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
                href="tel:+79166400506"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-4 hover:bg-primary-foreground/20 transition-colors"
              >
                <Icon name="Phone" size={22} />
                <div>
                  <div>+7-916-640-05-06</div>
                  <div className="text-sm opacity-70">Ирина</div>
                </div>
              </a>
              <a
                href="mailto:familyclassistra@mail.ru"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-4 hover:bg-primary-foreground/20 transition-colors"
              >
                <Icon name="Mail" size={22} />
                <span>familyclassistra@mail.ru</span>
              </a>
              <a
                href="https://yandex.ru/maps/?ll=36.899715%2C55.926441&mode=poi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-4 hover:bg-primary-foreground/20 transition-colors"
              >
                <Icon name="MapPin" size={22} />
                <span>Моск. обл., г/о Истра, д. Рычково — на карте →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="font-display text-xl font-semibold text-foreground">
                  FamilyClassIstra
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Семейная школа начального и среднего образования в деревне Рычково, г/о Истра.
              </p>
            </div>

            {/* Nav */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Школа</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {['about', 'programs', 'teachers', 'schedule'].map((id) => {
                  const label = NAV.find((n) => n.id === id)?.label;
                  return (
                    <li key={id}>
                      <button onClick={() => scrollTo(id)} className="hover:text-primary transition-colors">
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* More */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Информация</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {['news', 'faq', 'contacts'].map((id) => {
                  const label = NAV.find((n) => n.id === id)?.label;
                  return (
                    <li key={id}>
                      <button onClick={() => scrollTo(id)} className="hover:text-primary transition-colors">
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Контакты</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+79166400506" className="hover:text-primary transition-colors">
                    +7-916-640-05-06 (Ирина)
                  </a>
                </li>
                <li>
                  <a href="mailto:familyclassistra@mail.ru" className="hover:text-primary transition-colors">
                    familyclassistra@mail.ru
                  </a>
                </li>
                <li className="leading-snug">
                  Моск. обл., г/о Истра,<br />д. Рычково
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>© 2026 FamilyClassIstra. Все права защищены.</p>
            <button onClick={() => scrollTo('hero')} className="hover:text-primary transition-colors">
              Наверх ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;