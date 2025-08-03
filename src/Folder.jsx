import { useState } from "react";

import { useTranslation } from 'react-i18next';

const getCardsData = (t) => [
  {
    id: 1,
    title: t('folder.webDesign.title', 'Diseño web'),
    short: t('folder.webDesign.short', 'Diseño atractivo y funcional'),
    detail: t('folder.webDesign.detail', 'Diseñamos interfaces atractivas, intuitivas y centradas en el usuario, asegurando una experiencia visual coherente y profesional.')
  },
  {
    id: 2,
    title: t('folder.serviceTitan.title', 'Integración a ServiceTitan'),
    short: t('folder.serviceTitan.short', 'Automatiza tu operación'),
    detail: t('folder.serviceTitan.detail', 'Integramos tu negocio con ServiceTitan para automatizar procesos, mejorar la gestión y conectar tus sistemas de manera eficiente.')
  },
  {
    id: 3,
    title: t('folder.analytics.title', 'Analíticas de negocio y predicción de inventario'),
    short: t('folder.analytics.short', 'Toma decisiones inteligentes'),
    detail: t('folder.analytics.detail', 'Implementamos sistemas de analítica avanzada y predicción de inventario usando IA, para que tomes decisiones informadas y optimices tus recursos.')
  },
  {
    id: 4,
    title: t('folder.emailMarketing.title', 'Email marketing'),
    short: t('folder.emailMarketing.short', 'Conecta con tus clientes'),
    detail: t('folder.emailMarketing.detail', 'Diseñamos campañas de email marketing automatizadas que fidelizan y convierten, integradas con tus herramientas de ventas.')
  },
];

export default function Stack({
  cardDimensions = { width: "80%", height: "auto" },
  cardsData: propCardsData,
  fontSizeTitle = "text-xl md:text-3xl",
  fontSizeShort = "text-base md:text-xl",
  fontSizeDetail = "text-base md:text-xl",
}) {
  const { t } = useTranslation();
  const dynamicCardsData = getCardsData(t);
  const cards = propCardsData || dynamicCardsData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);


  // Navegación circular
  const goTo = (idx) => {
    setActiveIndex((idx + cards.length) % cards.length);
    setExpanded(true);
  };



  return (
    <div
      className="relative flex flex-col items-center justify-center select-none w-screen"
    >
      {/* Stack de tarjetas */}
      {cards.map((card, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={card.id}
            className="w-screen h-screen flex flex-col items-center justify-center cursor-pointer"
            onClick={() => {
              if (isActive) {
                setExpanded((prev) => !prev);
              } else {
                goTo(i);
              }
            }}
          >
            <div className="flex flex-col items-center justify-center text-center w-full h-full">
              <div className={`${fontSizeTitle} font-bold text-[#0A122E] mb-2 subtitle`}>
                {isActive && expanded ? card.title : card.short}
              </div>
              <div className={`${isActive && expanded ? fontSizeDetail : fontSizeShort} text-[#2A2C37] body-text`}>
                {isActive && expanded ? (
                  <div className={`w-full text-center ${fontSizeDetail} text-[#2A2C37] px-4 break-words min-h-[3.5rem]`}>{card.detail}</div>
                ) : null}
              </div>
            </div>
            {isActive && expanded && (
              <div className="text-xs text-[#0A122E] pb-2 cursor-pointer select-none">
                {t('folder.clickToCollapse', 'Haz clic para colapsar')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 
