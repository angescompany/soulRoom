import React from 'react';

const TimerDisplay = ({ time, progress, totalSeconds }) => {
    // r=120 (smaller to fit better), C ≈ 754
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="timer-container" style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
            {/* Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'var(--primary)',
                filter: 'blur(60px)',
                opacity: 0.2,
                borderRadius: '50%',
                zIndex: 0
            }}></div>

            <svg width="300" height="300" style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
                <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9d50bb" />
                        <stop offset="100%" stopColor="#6e48aa" />
                    </linearGradient>
                </defs>
                {/* Background Circle */}
                <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="10"
                />
                {/* Progress Circle */}
                <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    fill="transparent"
                    stroke="url(#timerGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                        transition: 'stroke-dashoffset 0.5s linear'
                    }}
                />
            </svg>

            {/* Text Content */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 2
            }}>
                <span style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    fontVariantNumeric: 'tabular-nums',
                    display: 'block',
                    lineHeight: 1,
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                    {time.display}
                </span>
                <span style={{
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    opacity: 0.6,
                    marginTop: '5px',
                    display: 'block'
                }}>
                    Restante
                </span>
            </div>
        </div>
    );
};

export default TimerDisplay;
