import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const getServiceOptions = (t) => [
  { label: t('contact.services.web'), value: 'web' },
  { label: t('contact.services.dashboard'), value: 'dashboard' },
  { label: t('contact.services.serviceTitan'), value: 'servicetitan' },
  { label: t('contact.services.automation'), value: 'automation' },
  { label: t('contact.services.other'), value: 'other' },
];

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    service: '',
    company: '',
    name: '',
    email: '',
    phone: '',
  });

  const serviceOptions = getServiceOptions(t);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => setSubmitted(true))
      .catch(() => alert('Error al enviar mensaje'));
  };

  if (submitted) {
    return <p className="text-center text-white">{t('contact.success')}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 container-rounded bg-white/[0.06] backdrop-blur-md p-8 md:p-10 ring-1 ring-white/10 shadow-[inset_0_0_0_1px_rgba(182,146,255,.22),0_10px_28px_rgba(108,72,237,.18)]"
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        {t('contact.formTitle')}
      </h2>
      <div>
        <label className="block mb-2 text-white" htmlFor="service">
          {t('contact.serviceLabel')}
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-black/40 text-white border border-white/20 focus:border-purple-500 focus:outline-none"
          required
        >
          <option value="" disabled>
            --
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-white" htmlFor="company">
          {t('contact.company')}
        </label>
        <input
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-black/40 text-white border border-white/20 focus:border-purple-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-white" htmlFor="name">
          {t('contact.name')}
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-black/40 text-white border border-white/20 focus:border-purple-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-white" htmlFor="email">
          {t('contact.email')}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-black/40 text-white border border-white/20 focus:border-purple-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-white" htmlFor="phone">
          {t('contact.phone')}
        </label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-black/40 text-white border border-white/20 focus:border-purple-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-500 hover:to-indigo-500"
      >
        {t('contact.submitButton')}
      </button>
    </form>
  );
}
