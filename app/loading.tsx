'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
    const [progress, setProgress] = useState(0);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 12;
            });
        }, 400);
        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(dotsInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] select-none">

            {/* Spinner */}
            <div className="relative mb-10">
                <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-white animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/80" />
                </div>
            </div>

            {/* Label */}
            <p className="text-white/50 text-sm font-mono tracking-widest mb-6 lowercase">
                loading{dots}
            </p>

            {/* Progress bar */}
            <div className="w-56 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white/70 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 90)}%` }}
                />
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
