import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProcessTimeline() {
	const { t } = useTranslation();
	const [visibleStep, setVisibleStep] = useState(0);
    const timelineRef = useRef(null);

    const timelineSteps = [
        {
            title: t('process.step1'),
            description: t('process.step1Detail'),
            icon: (
                <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle
                        cx='18'
                        cy='18'
                        r='16'
                        stroke='#6F47FF'
                        strokeWidth='4'
                        fill='none'
                    />
                    <path
                        d='M18 10v8l6 4'
                        stroke='#6F47FF'
                        strokeWidth='3'
                        strokeLinecap='round'
                    />
                </svg>
            ),
        },
        {
            title: t('process.step2'),
            description: t('process.step2Detail'),
            icon: (
                <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <rect
                        x='6'
                        y='8'
                        width='24'
                        height='20'
                        rx='4'
                        fill='#6F47FF'
                    />
                    <path
                        d='M10 14h16M10 20h10'
                        stroke='#202020'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                    />
                </svg>
            ),
        },
        {
            title: t('process.step3'),
            description: t('process.step3Detail'),
            icon: (
                <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <rect
                        x='8'
                        y='8'
                        width='20'
                        height='20'
                        rx='5'
                        fill='#6F47FF'
                    />
                    <rect
                        x='13'
                        y='13'
                        width='10'
                        height='10'
                        rx='2'
                        stroke='#202020'
                        strokeWidth='2'
                    />
                </svg>
            ),
        },
        {
            title: t('process.step4'),
            description: t('process.step4Detail'),
            icon: (
                <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <rect
                        x='6'
                        y='24'
                        width='8'
                        height='6'
                        rx='2'
                        fill='#6F47FF'
                    />
                    <rect
                        x='14'
                        y='18'
                        width='8'
                        height='12'
                        rx='2'
                        fill='#6F47FF'
                    />
                    <rect
                        x='22'
                        y='12'
                        width='8'
                        height='18'
                        rx='2'
                        fill='#6F47FF'
                    />
                    <path
                        d='M8 18l6-6 6 4 8-8'
                        stroke='#202020'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </svg>
            ),
        },
        {
            title: t('process.step5'),
            description: t('process.step5Detail'),
            icon: (
                <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle
                        cx='18'
                        cy='18'
                        r='16'
                        stroke='#6F47FF'
                        strokeWidth='4'
                        fill='none'
                    />
                    <rect
                        x='14'
                        y='10'
                        width='8'
                        height='16'
                        rx='4'
                        fill='#6F47FF'
                    />
                </svg>
            ),
        },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const handleIntersect = (entries) => {
            if (entries[0].isIntersecting && visibleStep < timelineSteps.length) {
                const timeout = setTimeout(
                    () => setVisibleStep(visibleStep + 1),
                    600
                );
                return () => clearTimeout(timeout);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        
        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }
        
        return () => {
            if (timelineRef.current) {
                observer.unobserve(timelineRef.current);
            }
        };
    }, [visibleStep, timelineSteps.length]);

    return (
        <div ref={timelineRef} className='timeline-container flex flex-col items-center w-full max-w-3xl mx-auto py-12' style={{ minHeight: '500px' }}>
            <div className='relative w-full'>
                <div className='flex flex-col gap-0 relative z-10'>
                    <AnimatePresence>
                        {timelineSteps.slice(0, visibleStep).map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.7, delay: idx * 0.1 }}
                                className='flex items-center gap-6 mb-0 relative'
                            >
                                <div className='flex flex-col items-center'>
                                    <div className='bg-[#202020] rounded-full border-4 border-[#6F47FF] flex items-center justify-center w-16 h-16 mb-0'>
                                        {step.icon}
                                    </div>
                                    {idx < timelineSteps.length - 1 && (
                                        <div className='w-px h-32 bg-[#6F47FF]' style={{ 
                                            marginBottom: '-6px',
                                            marginTop: '-6px',
                                            position: 'relative',
                                            zIndex: '-1'
                                        }} />
                                    )}
                                </div>
                                <div className='py-4'>
                                    <div className='text-2xl font-bold text-[#6F47FF] mb-1'>
                                        {step.title}
                                    </div>
                                    <div className='text-lg text-[#D6D6D6]'>
                                        {step.description}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
