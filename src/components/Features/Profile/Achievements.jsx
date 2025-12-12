import React from 'react';
import { FaFire, FaPrayingHands, FaUtensils, FaMedal } from 'react-icons/fa';

const Achievements = ({ stats }) => {
    // Define achievement thresholds
    const list = [
        { id: 'first_fast', icon: <FaUtensils />, title: 'Primer Ayuno', desc: 'Completaste tu primer ayuno', condition: stats.totalFasts > 0 },
        { id: 'prayer_warrior', icon: <FaPrayingHands />, title: 'Guerrero', desc: 'Acumulaste 5 horas de oración', condition: stats.totalPrayingTime >= 5 * 3600 },
        { id: 'streak_7', icon: <FaFire />, title: 'Constancia', desc: 'Racha de 7 días', condition: stats.streak >= 7 },
        { id: 'master', icon: <FaMedal />, title: 'Maestro', desc: 'Más de 20 disciplinas completadas', condition: (stats.totalFasts + stats.totalPrayers) > 20 }
    ];

    return (
        <div className="achievements-section">
            <div className="achievements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                {list.map(ach => (
                    <div
                        key={ach.id}
                        className={`achievement-card ${ach.condition ? 'unlocked' : ''}`}
                        style={{
                            padding: '1rem',
                            background: ach.condition ? 'rgba(106, 17, 203, 0.1)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${ach.condition ? '#6a11cb' : 'transparent'}`,
                            opacity: ach.condition ? 1 : 0.5,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', color: ach.condition ? '#ffd700' : '#888', marginBottom: '0.5rem' }}>
                            {ach.icon}
                        </div>
                        <h4 style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{ach.title}</h4>
                        <p style={{ fontSize: '0.7rem', opacity: 0.8 }}>{ach.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
