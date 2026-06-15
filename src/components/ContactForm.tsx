import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CLASSES = [
  '1 класс', '2 класс', '3 класс', '4 класс',
  '5 класс', '6 класс', '7 класс', '8 класс', '9 класс',
  'Дошкольник', 'Ещё не знаю',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', grade: '', comment: '' });
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Заявка с сайта:%0AИмя: ${form.name}%0AТелефон: ${form.phone}%0AКласс: ${form.grade}%0AКомментарий: ${form.comment}`;
    window.open(`https://t.me/familyclassistra?text=${msg}`, '_blank');
    setSent(true);
  };

  const inputCls = 'w-full rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-3 text-sm outline-none focus:border-primary-foreground/60 transition-colors';

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center text-primary-foreground">
        <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center">
          <Icon name="Check" size={28} />
        </div>
        <p className="font-display text-2xl font-semibold">Спасибо!</p>
        <p className="opacity-75 text-sm">Откроется Telegram — отправьте сообщение и мы свяжемся с вами.</p>
        <button onClick={() => setSent(false)} className="text-xs underline underline-offset-4 opacity-60 mt-2">
          Отправить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70 font-medium">Имя *</label>
        <input
          required
          value={form.name}
          onChange={set('name')}
          placeholder="Как вас зовут?"
          className={inputCls}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70 font-medium">Телефон *</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          placeholder="+7 (___) ___-__-__"
          className={inputCls}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70 font-medium">В какой класс?</label>
        <select value={form.grade} onChange={set('grade')} className={inputCls}>
          <option value="" className="text-foreground bg-background">— выберите —</option>
          {CLASSES.map((c) => (
            <option key={c} value={c} className="text-foreground bg-background">{c}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70 font-medium">Комментарий</label>
        <textarea
          value={form.comment}
          onChange={set('comment')}
          placeholder="Вопросы, пожелания..."
          rows={1}
          className={inputCls + ' resize-none'}
        />
      </div>
      <div className="md:col-span-2 flex justify-end pt-1">
        <Button type="submit" size="lg" className="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full md:w-auto">
          <Icon name="Send" size={16} />
          Отправить заявку
        </Button>
      </div>
    </form>
  );
}
