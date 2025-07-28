import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectCard({ title, description, isExpanded, onClick }) {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="relative container-rounded bg-[var(--color-slate)] shadow-xl flex flex-col items-center justify-center cursor-pointer p-8 mx-auto max-w-[280px] w-full mb-16 border-2 border-[var(--color-gunmetal)]"
      style={{
        height: '360px',
        boxShadow: 'rgba(111, 71, 255, 0.3) 0px 8px 32px 0px'
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="subtitle text-xl font-bold text-[var(--color-accent)] mb-4">
          {title}
        </div>
        <div className="body-text w-full text-center text-base text-[var(--color-text)] px-2 break-words">
          {description}
        </div>
      </div>
      {isExpanded && (
        <div className="text-xs text-[var(--color-highlight)] mt-4">
          {t('common.clickToCollapse') || 'Haz clic para colapsar'}
        </div>
      )}
    </div>
  );
}
