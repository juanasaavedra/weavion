import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Stack from './Folder';

export default function ServicesPage() {
  const { t } = useTranslation();
  const services = [
    { key: 'webDevelopment', bg: 'bg-[var(--color-slate)]' },
    { key: 'webDesign', bg: 'bg-[var(--color-gunmetal)]' },
    { key: 'serviceTitan', bg: 'bg-[var(--color-slate)]' },
    { key: 'analytics', bg: 'bg-[var(--color-gunmetal)]' },
    { key: 'emailMarketing', bg: 'bg-[var(--color-slate)]' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-[var(--color-text)] font-sans">
      <header className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-highlight)] mb-4">
          {t('services.title')}
        </h1>
        <Link to="/" className="text-[var(--color-accent)] hover:underline font-semibold">
          {t('common.backHome') || 'Volver al inicio'}
        </Link>
      </header>

      <div className="flex justify-center mb-12 px-4">
        <div className="w-full max-w-xl">
          <Stack randomRotation={false} sendToBackOnClick={false} cardDimensions={{ width: '100%', height: 350 }} />
        </div>
      </div>

      {services.map(({ key }) => (
        <motion.section
          key={key}
          className="h-screen flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute bg-white rounded-full"
            style={{ width: 20, height: 20 }}
            initial={{ scale: 0, opacity: 1 }}
            whileInView={{ scale: 15, opacity: 0 }}
            transition={{ duration: 1 }}
          />
          <div className="relative z-10 p-8 rounded-xl border-2 border-[var(--color-gunmetal)] shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-[var(--color-slate)] max-w-md text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-highlight)]">
              {t(`folder.${key}.title`)}
            </h2>
            <p className="text-lg">{t('product.prompt')}</p>
            <div className="mt-6 flex justify-center items-center">
              {key === 'webDevelopment' && (
                <motion.div initial={{ y: -50 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="w-40 h-28 border-4 border-gray-500 rounded-md relative bg-black flex items-center justify-center text-4xl">
                  💻
                </motion.div>
              )}
              {key === 'webDesign' && (
                <motion.div initial={{ y: -50 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="w-32 h-32 rounded-full border-4 border-gray-500 bg-black flex items-center justify-center text-4xl">
                  🎨
                </motion.div>
              )}
              {key === 'serviceTitan' && (
                <motion.div initial={{ y: -50 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="w-32 h-32 border-4 border-gray-500 bg-black flex items-center justify-center text-4xl">
                  🤖
                </motion.div>
              )}
              {key === 'analytics' && (
                <motion.div initial={{ y: -50 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="w-32 h-32 border-4 border-gray-500 bg-black flex items-center justify-center text-4xl">
                  📊
                </motion.div>
              )}
              {key === 'emailMarketing' && (
                <motion.div initial={{ y: -50 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="w-32 h-24 border-4 border-gray-500 bg-black flex items-center justify-center text-4xl">
                  📧
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
