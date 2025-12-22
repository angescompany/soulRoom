import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaStar } from 'react-icons/fa';
import BeginnerGuides from '../Home/BeginnerGuides';
import TopicsOfInterest from '../Topics/TopicsOfInterest';
import VersesByTopic from './VersesByTopic';

const ReadingDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Lectura</h1>
            </header>

            <div className="content-scroll">

                {/* Main Bible Access Card */}
                <div
                    onClick={() => navigate('/bible')}
                    className="glass-card"
                    style={{
                        padding: '30px',
                        marginBottom: '30px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(118, 75, 162, 0.4)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        width: '70px', height: '70px',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '15px',
                        fontSize: '2rem',
                        color: 'white'
                    }}>
                        <FaBookOpen />
                    </div>
                    <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '1.8rem' }}>Santa Biblia</h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                        Explora las escrituras, versículo a versículo.
                    </p>

                    {/* Decorative Background Icon */}
                    <FaBookOpen style={{
                        position: 'absolute',
                        right: '-20px',
                        bottom: '-40px',
                        fontSize: '10rem',
                        opacity: 0.1,
                        color: 'white',
                        transform: 'rotate(-15deg)'
                    }} />
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaStar color="var(--accent)" /> Temas de Interés y Guías
                </h3>

                <TopicsOfInterest />

                <VersesByTopic />

                <BeginnerGuides />

            </div>
        </div>
    );
};

export default ReadingDashboard;
