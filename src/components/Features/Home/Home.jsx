import React, { useEffect, useState } from 'react';
import { FaUtensils, FaPrayingHands, FaBookOpen } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';

const Home = () => {
    const { user } = useAppContext();
    const [greeting, setGreeting] = useState('Hola');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Buenos Días');
        else if (hour < 18) setGreeting('Buenas Tardes');
        else setGreeting('Buenas Noches');
    }, []);

    return (
        <div className="home-container">
            {/* Header Greeting */}
            <header style={{ marginBottom: '25px' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2px' }}>{greeting},</p>
                <h1>{user ? user.name : 'Invitado'}</h1>
            </header>

            {/* Daily Verse Card */}
            <div className="glass-card verse-card-main" style={{
                background: 'linear-gradient(135deg, rgba(157, 80, 187, 0.15) 0%, rgba(110, 72, 170, 0.05) 100%)',
                border: '1px solid rgba(157, 80, 187, 0.3)',
                marginBottom: '30px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)', marginBottom: '10px' }}>Versículo del Día</h3>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        lineHeight: '1.6',
                        color: '#fff',
                        marginBottom: '15px'
                    }}>
                        "Mas los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas..."
                    </p>
                    <p style={{ textAlign: 'right', fontSize: '0.9rem', fontWeight: 'bold' }}>— Isaías 40:31</p>
                </div>
                {/* Decorative glow */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(157, 80, 187, 0.4) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0
                }}></div>
            </div>

            {/* Quick Actions Grid */}
            <h2 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Acceso Rápido</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <QuickAction to="/fasting" icon={<FaUtensils />} label="Ayuno" color="#e17055" />
                <QuickAction to="/prayer" icon={<FaPrayingHands />} label="Oración" color="#00b894" />
                <QuickAction to="/bible" icon={<FaBookOpen />} label="Biblia" color="#0984e3" />
            </div>

            {/* Recent Activity/Stats Placeholder */}
            <div style={{ marginTop: '30px' }}>
                <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', display: 'block', lineHeight: 1 }}>0</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Días en Racha</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', display: 'block', lineHeight: 1 }}>0h</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Oradas esta semana</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickAction = ({ to, icon, label, color }) => (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
        <div className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '20px 10px',
            textAlign: 'center',
            height: '100%',
            transition: 'transform 0.2s'
        }}>
            <div style={{
                fontSize: '1.5rem',
                color: color,
                background: `${color}20`,
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>{label}</span>
        </div>
    </NavLink>
);

export default Home;
