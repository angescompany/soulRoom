import React, { useEffect, useState, useMemo } from 'react';
import { FaUtensils, FaPrayingHands, FaBookOpen, FaBolt, FaHeart, FaShareAlt, FaBook, FaTimes } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';

import { DAILY_VERSES } from '../../../data/dailyVerses';
import BeginnerGuides from './BeginnerGuides';

const Home = () => {
    const { user, prayingHistory } = useAppContext();
    const [greeting, setGreeting] = useState('Hola');
    const [liked, setLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Buenos Días');
        else if (hour < 18) setGreeting('Buenas Tardes');
        else setGreeting('Buenas Noches');
    }, []);

    // Get Daily Verse
    // Get Daily Verse Logic
    const getDailyVerse = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0); // Start of year
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const verseIndex = dayOfYear % DAILY_VERSES.length;
        return DAILY_VERSES[verseIndex];
    };

    const [todayVerse, setTodayVerse] = useState(getDailyVerse());

    useEffect(() => {
        // Update check every minute
        const interval = setInterval(() => {
            const verse = getDailyVerse();
            // Optional: Only update if changed, but object ref might differ. 
            // In this specific calc, logic is deterministic by day.
            // We can just set it, React diffing handles simple object equality if ref same? 
            // Actually DAILY_VERSES[i] is same ref. So it will be efficient.
            setTodayVerse(verse);
        }, 60000); // Check every minute

        // Update on visibility change (user comes back to app)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setTodayVerse(getDailyVerse());
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Versículo del Día',
                text: `"${todayVerse.text}" — ${todayVerse.reference}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("Compartir no soportado en este navegador");
        }
    };

    // Calculate Stats
    const stats = useMemo(() => {
        // Total Hours
        const totalSeconds = prayingHistory.reduce((acc, curr) => acc + curr.duration, 0);
        const hours = Math.round(totalSeconds / 3600);

        // Simple Streak (Unique days with prayer)
        const uniqueDays = new Set(prayingHistory.map(p => p.date.split('T')[0])).size;

        // Active Streak Logic
        const isActive = uniqueDays > 0;

        return { hours, streak: uniqueDays, isActive };
    }, [prayingHistory]);

    // Background Image Logic (Pexels + Cache)
    const [bgUrl, setBgUrl] = useState(todayVerse.image); // Default to static image initially

    useEffect(() => {
        const fetchPexelsImage = async () => {
            const today = new Date().toISOString().split('T')[0];
            const cacheKey = `dailyImage_${today}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                setBgUrl(cachedData);
                return;
            }

            try {
                const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
                if (!apiKey) {
                    console.warn("Pexels API Key missing");
                    return;
                }

                // Fetch nature/landscape, orientation portrait or landscape depending on device? 
                // Let's go generic 'nature landscape'.
                // varying 'page' based on day of year to rotate images deterministically or random?
                // Random is fine if cached for the day.
                const randomPage = Math.floor(Math.random() * 100) + 1;
                const response = await fetch(`https://api.pexels.com/v1/search?query=nature+landscape&per_page=1&page=${randomPage}&orientation=landscape`, {
                    headers: {
                        Authorization: apiKey
                    }
                });

                if (!response.ok) throw new Error('Pexels API error');

                const data = await response.json();
                if (data.photos && data.photos.length > 0) {
                    const imageUrl = data.photos[0].src.large2x; // High quality
                    localStorage.setItem(cacheKey, imageUrl);
                    setBgUrl(imageUrl);

                    // Cleanup old cache text (optional, simpler to just leave it or generic cleanup)
                    // Simple cleanup: remove keys not matching today?
                    // Let's keep it simple for now. 
                    // Actually, let's remove yesterday's to prevent bloat logic later.
                    Object.keys(localStorage).forEach(key => {
                        if (key.startsWith('dailyImage_') && key !== cacheKey) {
                            localStorage.removeItem(key);
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch Pexels image:", error);
                // Fallback remains todayVerse.image
            }
        };

        fetchPexelsImage();
    }, []); // Run once on mount (daily check handled by cache logic on reload, user mostly reloads)


    return (
        <div className="home-container">
            {/* Header Greeting & StatsRefactor */}
            <header style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* User Avatar */}
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid #2d3436',
                        background: '#00E5FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00E5FF', color: '#fff', fontSize: '1.2rem' }}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                    </div>

                    {/* Greeting & Name */}
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>
                        {greeting}, <span style={{ color: 'var(--primary)' }}>{user ? user.name.split(' ')[0] : 'Invitado'}</span>.
                    </h1>
                </div>

                {/* Stats Icons */}
                <div style={{ display: 'flex', gap: '15px', paddingBottom: '5px' }}>

                    {/* Streak */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaBolt size={20} color={stats.isActive ? '#f1c40f' : 'rgba(255,255,255,0.3)'} />
                        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{stats.streak}</span>
                    </div>

                    {/* Prayer Hours */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaPrayingHands size={20} color="var(--accent)" />
                        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{stats.hours}h</span>
                    </div>

                </div>
            </header>

            {/* Daily Verse Card */}
            <div
                className="glass-card verse-card-main"
                onClick={() => setIsExpanded(true)}
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('${bgUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#2d3436', // Fallback color
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    marginBottom: '30px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    cursor: 'pointer'
                }}
            >
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#fff', marginBottom: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Versículo del Día</h3>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.3rem',
                        fontStyle: 'italic',
                        lineHeight: '1.6',
                        color: '#fff',
                        marginBottom: '20px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        "{todayVerse.text}"
                    </p>
                    <p style={{ textAlign: 'right', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginBottom: '20px' }}>— {todayVerse.reference}</p>

                    {/* Actions Row */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setLiked(!liked)} style={{ background: 'none', border: 'none', color: liked ? '#e74c3c' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                            <FaHeart size={20} />
                        </button>
                        <button onClick={handleShare} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                            <FaShareAlt size={18} />
                        </button>
                        <NavLink to="/bible" state={{ bookId: todayVerse.bookId, chapter: todayVerse.chapter }} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', marginLeft: 'auto', background: 'rgba(0,0,0,0.3)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)' }}>
                            <FaBook size={14} /> Leer Capítulo
                        </NavLink>
                    </div>
                </div>
            </div>



            {/* FULLSCREEN MODAL */}
            {
                isExpanded && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 9999,
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url('${bgUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#2d3436',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '30px',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                position: 'absolute', top: '20px', right: '20px',
                                background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                                width: '40px', height: '40px', color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTimes size={20} />
                        </button>

                        <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.8rem',
                                fontStyle: 'italic',
                                lineHeight: '1.6',
                                color: '#fff',
                                marginBottom: '20px',
                                textShadow: '0 2px 10px rgba(0,0,0,0.7)'
                            }}>
                                "{todayVerse.text}"
                            </p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>— {todayVerse.reference}</p>
                        </div>

                        {/* Bottom Actions - Fullscreen */}
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '0', right: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '40px'
                        }}>
                            <button onClick={() => setLiked(!liked)} style={{ background: 'none', border: 'none', color: liked ? '#e74c3c' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <FaHeart size={24} />
                                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Me Gusta</span>
                            </button>
                            <button onClick={handleShare} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <FaShareAlt size={24} />
                                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Compartir</span>
                            </button>
                            <NavLink to="/bible" state={{ bookId: todayVerse.bookId, chapter: todayVerse.chapter }} onClick={() => setIsExpanded(false)} style={{ textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <FaBook size={24} />
                                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Leer</span>
                            </NavLink>
                        </div>
                    </div>
                )
            }

            {/* Feature Carousel (Explorar la App) */}
            <h2 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Explorar la App</h2>
            <FeatureCarousel />

            {/* Beginner Guides Section */}
            <BeginnerGuides />

        </div >
    );
};

const FeatureCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const features = [
        {
            id: 1,
            title: "La importancia del Ayuno",
            subtitle: "El ayuno es una llave que libera el poder espiritual en tu vida.",
            path: "/fasting",
            btnText: "Ir a Ayuno",
            icon: <FaUtensils />,
            gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
            shadow: "0 10px 20px -5px rgba(255, 94, 98, 0.4)"
        },
        {
            id: 2,
            title: "Cuarto de Oración",
            subtitle: "La oración es el aliento del alma.",
            path: "/prayer",
            btnText: "Ir a Oración",
            icon: <FaPrayingHands />,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            shadow: "0 10px 20px -5px rgba(0, 242, 254, 0.4)"
        },
        {
            id: 3,
            title: "Lectura Bíblica",
            subtitle: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
            path: "/bible",
            btnText: "Ir a Biblia",
            icon: <FaBookOpen />,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            shadow: "0 10px 20px -5px rgba(118, 75, 162, 0.4)"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % features.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [features.length]);

    return (
        <div style={{ paddingBottom: '20px' }}>
            <div style={{
                position: 'relative',
                height: '250px',
                overflow: 'hidden',
                borderRadius: '20px',
                cursor: 'pointer'
            }}>
                {features.map((feature, index) => {
                    let position = 'next';
                    if (index === activeIndex) position = 'active';
                    else if (index === (activeIndex - 1 + features.length) % features.length) position = 'prev';

                    // Simple logic: If not active, hide (opacity 0) or transform off-screen
                    // For a smooth slide effect without complex libraries, we can use absolute positioning and transitions on opacity/transform
                    const isActive = index === activeIndex;

                    return (
                        <div
                            key={feature.id}
                            onClick={() => navigate(feature.path)}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, width: '100%', height: '100%',
                                background: feature.gradient,
                                borderRadius: '20px',
                                padding: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                color: '#fff',
                                boxShadow: feature.shadow,
                                opacity: isActive ? 1 : 0,
                                transform: isActive ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
                                transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                pointerEvents: isActive ? 'auto' : 'none',
                                zIndex: isActive ? 2 : 1
                            }}
                        >
                            <div style={{
                                flex: 1,
                                paddingRight: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                zIndex: 2
                            }}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    width: '50px', height: '50px',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '15px',
                                    fontSize: '1.4rem',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', lineHeight: '1.2', fontWeight: '800' }}>{feature.title}</h3>
                                <p style={{ margin: '0 0 20px 0', fontWeight: '500', fontSize: '0.95rem', lineHeight: '1.4', color: 'rgba(255,255,255,0.95)', maxWidth: '90%' }}>{feature.subtitle}</p>

                                <span style={{
                                    display: 'inline-block',
                                    background: 'rgba(255,255,255,0.25)',
                                    padding: '10px 25px',
                                    borderRadius: '25px',
                                    textDecoration: 'none',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    backdropFilter: 'blur(5px)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    marginBottom: '5px'
                                }}>
                                    {feature.btnText}
                                </span>
                            </div>
                            {/* Decorative large icon opacity */}
                            <div style={{
                                position: 'absolute',
                                right: '-20px',
                                bottom: '-30px',
                                fontSize: '10rem',
                                opacity: 0.1,
                                transform: 'rotate(-15deg)',
                                pointerEvents: 'none'
                            }}>
                                {feature.icon}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
                {features.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            width: index === activeIndex ? '20px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: index === activeIndex ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    )
};

export default Home;

