import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import './LandingPage.css';

import { useAppContext } from '../../../context/AppContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const [currentScreen, setCurrentScreen] = useState(0);
    const totalScreens = 4;
    const isScrolling = useRef(false);
    const touchStart = useRef({ x: 0, y: 0 });

    const handleStart = () => {
        localStorage.setItem('hasVisited', 'true');
        if (user) {
            navigate('/');
        } else {
            navigate('/auth');
        }
    };

    const nextScreen = () => {
        if (currentScreen < totalScreens - 1) setCurrentScreen(prev => prev + 1);
    };

    const prevScreen = () => {
        if (currentScreen > 0) setCurrentScreen(prev => prev - 1);
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextScreen();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevScreen();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentScreen]);

    // Wheel Support
    useEffect(() => {
        const handleWheel = (e) => {
            if (isScrolling.current) return;

            if (e.deltaY > 50 && currentScreen < totalScreens - 1) {
                isScrolling.current = true;
                nextScreen();
                setTimeout(() => isScrolling.current = false, 800);
            } else if (e.deltaY < -50 && currentScreen > 0) {
                isScrolling.current = true;
                prevScreen();
                setTimeout(() => isScrolling.current = false, 800);
            }
        };
        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentScreen]);

    // Touch Support
    const handleTouchStart = (e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e) => {
        if (isScrolling.current) return;
        const diffX = touchStart.current.x - e.changedTouches[0].clientX;
        const diffY = touchStart.current.y - e.changedTouches[0].clientY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal Swipe
            if (diffX > 50 && currentScreen < totalScreens - 1) nextScreen();
            if (diffX < -50 && currentScreen > 0) prevScreen();
        } else {
            // Vertical Swipe
            if (diffY > 50 && currentScreen < totalScreens - 1) nextScreen();
            if (diffY < -50 && currentScreen > 0) prevScreen();
        }
    };

    return (
        <div
            className="onboarding-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="screens-wrapper"
                style={{ transform: `translateX(-${currentScreen * 25}%)` }}
            >
                {/* Screen 1: Prayer */}
                <div className={`screen screen-1 ${currentScreen === 0 ? 'active' : ''}`}>
                    <div className="particles">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                left: `${Math.random() * 90}%`,
                                top: `${Math.random() * 90}%`,
                                animationDelay: `${i}s`
                            }} />
                        ))}
                    </div>
                    <div className="icon-container">
                        <div className="icon-glass">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 8C32 8 28 16 28 24C28 28 30 32 32 32C34 32 36 28 36 24C36 16 32 8 32 8Z" fill="currentColor" opacity="0.3" />
                                <path d="M20 56C20 56 22 40 26 32C28 28 30 26 32 26C34 26 36 28 38 32C42 40 44 56 44 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                <path d="M26 32C26 32 28 28 32 28C36 28 38 32 38 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                <path d="M24 42C24 42 28 38 32 38C36 38 40 42 40 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                <circle cx="32" cy="18" r="3" fill="currentColor" opacity="0.6" />
                                <path d="M16 14L20 18M48 14L44 18M12 24H18M46 24H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                            </svg>
                        </div>
                    </div>
                    <div className="content">
                        <span className="tag">Comunión Diaria</span>
                        <h1 className="title">Oración</h1>
                        <p className="description">Conecta con Dios a través de momentos de oración guiada. Encuentra paz interior y fortaleza.</p>
                    </div>
                </div>

                {/* Screen 2: Fasting */}
                <div className={`screen screen-2 ${currentScreen === 1 ? 'active' : ''}`}>
                    <div className="particles">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                left: `${Math.random() * 90}%`,
                                top: `${Math.random() * 90}%`,
                                animationDelay: `${i}s`
                            }} />
                        ))}
                    </div>
                    <div className="icon-container">
                        <div className="icon-glass">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40 12C32 12 26 20 26 30C26 40 32 48 40 48C42 48 44 47.5 46 46.5C42 50 36 52 30 52C18 52 8 42 8 30C8 18 18 8 30 8C36 8 42 10 46 13.5C44 12.5 42 12 40 12Z" fill="currentColor" />
                                <circle cx="48" cy="16" r="2" fill="currentColor" opacity="0.8" />
                                <circle cx="54" cy="26" r="1.5" fill="currentColor" opacity="0.6" />
                                <path d="M52 20L54 18M56 24L58 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="content">
                        <span className="tag">Disciplina Espiritual</span>
                        <h1 className="title">Ayuno</h1>
                        <p className="description">Registra y programa tus tiempos de ayuno con recordatorios inteligentes y planes guiados.</p>
                    </div>
                </div>

                {/* Screen 3: Bible */}
                <div className={`screen screen-3 ${currentScreen === 2 ? 'active' : ''}`}>
                    <div className="particles">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                left: `${Math.random() * 90}%`,
                                top: `${Math.random() * 90}%`,
                                animationDelay: `${i}s`
                            }} />
                        ))}
                    </div>
                    <div className="icon-container">
                        <div className="icon-glass">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16C8 14 10 12 14 12C20 12 28 14 32 18C36 14 44 12 50 12C54 12 56 14 56 16V48C56 50 54 52 50 52C44 52 36 50 32 46C28 50 20 52 14 52C10 52 8 50 8 48V16Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <path d="M32 18V46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M32 24V36M28 30H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="content">
                        <span className="tag">Sabiduría Divina</span>
                        <h1 className="title">La Palabra</h1>
                        <p className="description">Sumérgete en las Escrituras con planes de lectura y versículos diarios para meditar.</p>
                    </div>
                </div>

                {/* Screen 4: Welcome */}
                <div className={`screen screen-4 ${currentScreen === 3 ? 'active' : ''}`}>
                    <div className="particles">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                left: `${Math.random() * 90}%`,
                                top: `${Math.random() * 90}%`,
                                animationDelay: `${i}s`
                            }} />
                        ))}
                    </div>
                    <div className="icon-container">
                        <div className="icon-glass">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffc144" />
                                        <stop offset="50%" stopColor="#a78bfa" />
                                        <stop offset="100%" stopColor="#34d399" />
                                    </linearGradient>
                                </defs>
                                <path d="M32 6V58M18 22H46" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
                                <path d="M32 34C32 34 24 28 24 22C24 18 28 16 32 20C36 16 40 18 40 22C40 28 32 34 32 34Z" fill="url(#logoGradient)" opacity="0.8" />
                                <circle cx="32" cy="32" r="26" stroke="url(#logoGradient)" strokeWidth="2" fill="none" opacity="0.3" />
                            </svg>
                        </div>
                    </div>
                    <div className="content">
                        <span className="tag">Tu compañero espiritual</span>
                        <h1 className="title">SoulRoom</h1>
                        <p className="description">Oración, ayuno y la Palabra de Dios, todo en un solo lugar.</p>
                        <button className="btn-enter" onClick={handleStart}>
                            Comenzar mi viaje
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <nav className="navigation">
                <button className="nav-arrow" disabled={currentScreen === 0} onClick={prevScreen}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <div className="dots">
                    {[0, 1, 2, 3].map(i => (
                        <button
                            key={i}
                            className={`dot ${i === currentScreen ? 'active' : ''}`}
                            onClick={() => setCurrentScreen(i)}
                        />
                    ))}
                </div>
                <button className="nav-arrow" disabled={currentScreen === totalScreens - 1} onClick={nextScreen}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </nav>
        </div>
    );
};

export default LandingPage;
