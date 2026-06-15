import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CLASSES = [
  '1 класс', '2 класс', '3 класс', '4 класс',
  '5 класс', '6 класс', '7 класс', '8 класс', '9 класс',
  'Дошкольник', 'Ещё не знаю',
];

const API_URL = 'https://functions.poehali.dev/d17c623d-8a71-4219-befa-14b89d6e7dac';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', grade: '', comment: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      setSent(true);
    } catch {
      setError('Не удалось отправить. Позвоните нам: +7-916-640-05-06');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors';

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center text-white">
        <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center">
          <Icon name="Check" size={28} />
        </div>
        <p className="font-display text-2xl font-semibold">Спасибо!</p>
        <p className="opacity-75 text-sm">Заявка отправлена — мы получили её в Telegram и на почту. Скоро свяжемся!</p>
        <button onClick={() => { setSent(false); setForm({ name: '', phone: '', grade: '', comment: '' }); }} className="text-xs underline underline-offset-4 opacity-60 mt-2">
          Отправить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/80 font-medium">Имя *</label>
        <input
          required
          value={form.name}
          onChange={set('name')}
          placeholder="Как вас зовут?"
          className={inputCls}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/80 font-medium">Телефон *</label>
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
        <label className="text-xs text-white/80 font-medium">В какой класс?</label>
        <select value={form.grade} onChange={set('grade')} className={inputCls}>
          <option value="" className="text-foreground bg-background">— выберите —</option>
          {CLASSES.map((c) => (
            <option key={c} value={c} className="text-foreground bg-background">{c}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/80 font-medium">Комментарий</label>
        <textarea
          value={form.comment}
          onChange={set('comment')}
          placeholder="Вопросы, пожелания..."
          rows={1}
          className={inputCls + ' resize-none'}
        />
      </div>
      {error && (
        <div className="md:col-span-2 text-sm text-red-300">{error}</div>
      )}
      <div className="md:col-span-2 flex justify-end pt-1">
        <Button type="submit" size="lg" disabled={loading} className="rounded-full px-8 bg-white text-primary hover:bg-white/90 w-full md:w-auto font-semibold">
          <Icon name={loading ? 'Loader' : 'Send'} size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Отправляем...' : 'Отправить заявку'}
        </Button>
      </div>
    </form>
  );
}