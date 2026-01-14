import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date('2026-01-26T14:00:00'); // Jan 26, 2026 2:00 PM
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            // Fallback if event passed
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeUnits = [
        { label: '일', value: timeLeft.days },
        { label: '시간', value: timeLeft.hours },
        { label: '분', value: timeLeft.minutes },
        { label: '초', value: timeLeft.seconds },
    ];

    return (
        <div className="w-full mb-10">
            <h3 className="text-center text-brand-neon font-bold mb-4 tracking-wider uppercase text-sm">설명회 시작까지 남은 시간</h3>
            <div className="flex justify-center gap-4 md:gap-8">
                {timeUnits.map((unit, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="glass w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                                {String(unit.value).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-gray-400 text-sm mt-2">{unit.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;
